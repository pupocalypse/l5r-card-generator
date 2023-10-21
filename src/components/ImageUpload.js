import { useState, useEffect, useRef, useContext } from "react";
import { CardContext } from "../App";
import { absolutePosition } from "../js/utility";

const sliderDefault = 120;

function ImageUpload() {
  const { cardDetails, setCardDetails } = useContext(CardContext);
  const [imagePos, setImagePos] = useState(cardDetails.photo.position);
  const [sliderVal, setSliderVal] = useState(
    cardDetails.photo.scale || sliderDefault
  );
  const [sliderMax, setSliderMax] = useState(400);
  let imageRef = useRef(null),
    liveAreaRef = useRef(null),
    liveAreaRect = () => absolutePosition(liveAreaRef.current);
  let startX = 0,
    startY = 0,
    newX = 0,
    newY = 0;

  // position image on mount, or
  // store current image size and position in cardDetails before unmounting
  useEffect(() => {
    // console.log("inside mounting effect");
    // const imageRect = absolutePosition(imageRef.current);
    // TO DO - set top and left position somewhere in imageRect or imageRef.current
    // imageRef.current.style.top = imagePos.top + "px";
    // imageRef.current.style.left = imagePos.left + "px";
    // if (imageRef.current.classList.contains("horizontal")) {
    //   imageRef.current.style.height = `${sliderVal}%`;
    // }
    // if (imageRef.current.classList.contains("vertical")) {
    //   imageRef.current.style.width = `${sliderVal}%`;
    // }

    return () => {
      // console.log("cleanup function running");
      cardDetails.photo.position = {
        top: Math.floor(imagePos.top),
        left: Math.floor(imagePos.left),
      };
      cardDetails.photo.scale = sliderVal;
      setCardDetails(cardDetails);
    };
  }, []);

  // adjust image size & slider max on slider change
  useEffect(() => {
    // console.log("inside image resize useEffect");
    // declared inside useEffect to counter dependency warnings
    const changeSliderMax = () => {
      // console.log("inside changeSliderMax");
      const liveArea = liveAreaRect();
      const maxWidthPixels = liveArea.width * 4;
      let newMax;

      // change slider max value if intrinsic image size is less
      if (
        imageRef.current.naturalWidth < maxWidthPixels ||
        imageRef.current.naturalHeight < maxWidthPixels
      ) {
        if (
          imageRef.current.naturalWidth < maxWidthPixels &&
          imageRef.current.naturalWidth <= imageRef.current.naturalHeight
        ) {
          // if width is the smaller value...
          newMax =
            Math.floor((imageRef.current.naturalWidth / liveArea.width) * 10) *
            10;
        } else if (imageRef.current.naturalHeight < maxWidthPixels) {
          // if height is the smaller value...
          newMax =
            Math.floor(
              (imageRef.current.naturalHeight / liveArea.height) * 10
            ) * 10;
        }

        setSliderMax(newMax);
      }
    };

    changeSliderMax();
    setImageDirection();
  }, [sliderVal]);

  const setImageDirection = (e) => {
    // console.log("inside setImageDirection");
    if (imageRef.current.width >= imageRef.current.height) {
      // default horizontal for square images
      imageRef.current.classList.add("horizontal");
      imageRef.current.classList.remove("vertical");
    } else {
      imageRef.current.classList.add("vertical");
      imageRef.current.classList.remove("horizontal");
    }
  };

  const resetImage = (e) => {
    imageRef.current.style.top = "50%";
    imageRef.current.style.left = "50%";
    imageRef.current.style.transform = "translate(-50%, -50%)";
    setSliderVal(sliderDefault);
    if (imageRef.current.classList.contains("horizontal")) {
      imageRef.current.style.height = `${sliderDefault}%`;
    }
    if (imageRef.current.classList.contains("vertical")) {
      imageRef.current.style.width = `${sliderDefault}%`;
    }
  };

  const moveImage = (e) => {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    const imageRect = absolutePosition(imageRef.current);
    const liveArea = liveAreaRect();

    if (
      imageRect.left - newX <= Math.ceil(liveArea.left) &&
      imageRect.right - newX >= Math.floor(liveArea.right)
    ) {
      imageRef.current.style.left = imageRef.current.offsetLeft - newX + "px";
    }
    if (
      imageRect.top - newY <= Math.ceil(liveArea.top) &&
      imageRect.bottom - newY >= Math.floor(liveArea.bottom)
    ) {
      imageRef.current.style.top = imageRef.current.offsetTop - newY + "px";
    }

    setImagePos({
      top: parseInt(imageRef.current.style.top, 10),
      left: parseInt(imageRef.current.style.left, 10),
    });
  };

  const resizeImage = (e) => {
    // console.log("inside resizeImage");
    const newVal = e.target.value;

    if (imageRef.current.classList.contains("horizontal")) {
      imageRef.current.style.height = `${newVal}%`;
      // to do - resize result image
    }
    if (imageRef.current.classList.contains("vertical")) {
      imageRef.current.style.width = `${newVal}%`;
      // to do - resize result image
    }

    const imageRect = absolutePosition(imageRef.current);
    const liveArea = liveAreaRect();

    // check if new edges of image rect are within live area rect, set to closest edge if not
    let newTop, newLeft;

    // manage left and right edges out of bounds
    // find new 'left' value from difference between imageRect and liveArea, add or subtract from actual calculated left as necessary
    if (imageRect.left > liveArea.left) {
      newLeft =
        parseInt(imageRef.current.style.left, 10) -
        Math.ceil(imageRect.left - liveArea.left);
    } else if (imageRect.right < liveArea.right) {
      newLeft =
        parseInt(imageRef.current.style.left, 10) +
        Math.ceil(liveArea.right - imageRect.right);
    }

    // manage top and bottom edges out of bounds
    // find new 'top' value from difference between imageRect and liveArea, add or subtract from actual calculated top as necessary
    if (imageRect.top > liveArea.top) {
      newTop =
        parseInt(imageRef.current.style.top, 10) -
        Math.ceil(imageRect.top - liveArea.top);
    } else if (imageRect.bottom < liveArea.bottom) {
      newTop =
        parseInt(imageRef.current.style.top, 10) +
        Math.ceil(liveArea.bottom - imageRect.bottom);
    }

    // assign new position
    if (newTop) {
      imageRef.current.style.top = newTop + "px";
    }
    if (newLeft) {
      imageRef.current.style.left = newLeft + "px";
    }

    setSliderVal(parseInt(newVal, 10));
    setImagePos({
      top: parseInt(imageRef.current.style.top, 10),
      left: parseInt(imageRef.current.style.left, 10),
    });
  };

  const mouseDownHandler = (e) => {
    startX = Math.round(e.clientX);
    startY = Math.round(e.clientY);
    window.addEventListener("mousemove", moveImage);
  };

  const mouseUpHandler = (e) => {
    window.removeEventListener("mousemove", moveImage);
  };

  window.addEventListener("mouseup", mouseUpHandler);

  return (
    <div className="img-upload">
      <div className="preview-container">
        <div className="preview-container__live-area" ref={liveAreaRef}>
          <img
            src="/graphics/images/noface_samurai.png"
            alt=""
            draggable="false"
            ref={imageRef}
            onLoad={setImageDirection}
            onMouseDown={mouseDownHandler}
          />
        </div>
      </div>
      <input
        type="range"
        className="slider"
        name="resize-slider"
        min="100"
        max={sliderMax}
        step="10"
        value={sliderVal}
        onChange={resizeImage}
      />
      <button className="button" type="button" onClick={resetImage}>
        Reset
      </button>
      <button className="button" type="button">
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
