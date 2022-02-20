import {
  useState,
  useEffect,
  useRef,
  useContext,
} from "react/cjs/react.development";
import { CardContext } from "../App";
import { absolutePosition } from "../js/utility";

function ImageUpload() {
  const { cardDetails, setCardDetails } = useContext(CardContext);
  let imageRef = useRef(null),
    resetRef = useRef(null),
    resizeRef = useRef(null),
    liveAreaRef = useRef(null),
    liveAreaRectRef = useRef(null);
  let startX = 0,
    startY = 0,
    newX = 0,
    newY = 0;
  const [imagePos, setImagePos] = useState(cardDetails.photo.position);
  const [sliderVal, setSliderVal] = useState(cardDetails.photo.scale);

  // adjust image size on slider change
  useEffect(() => {
    liveAreaRectRef.current = absolutePosition(liveAreaRef.current);
    let sliderMax = liveAreaRectRef.current.width * 4;

    if (imageRef.current.style.width > imageRef.current.style.height) {
      imageRef.current.classList.add("horizontal");
    } else if (imageRef.current.style.height > imageRef.current.style.width) {
      imageRef.current.classList.add("vertical");
    } else {
      // default horizontal for square images
      imageRef.current.classList.add("horizontal");
    }

    // change slider max value if intrinsic image size is less
    if (
      imageRef.current.naturalWidth < sliderMax ||
      imageRef.current.naturalHeight < sliderMax
    ) {
      let newMax;
      if (
        imageRef.current.naturalWidth < sliderMax &&
        imageRef.current.naturalWidth <= imageRef.current.naturalHeight
      ) {
        // if width is the smaller value...
        newMax =
          Math.floor(
            (imageRef.current.naturalWidth / liveAreaRectRef.current.width) * 10
          ) * 10;
      } else if (imageRef.current.naturalHeight < sliderMax) {
        // if height is the smaller value...
        newMax =
          Math.floor(
            (imageRef.current.naturalHeight / liveAreaRectRef.current.height) *
              10
          ) * 10;
      }

      resizeRef.current.setAttribute("max", newMax);
    }

    previewImage();
  }, [sliderVal]);

  // store current image size and position in cardDetails before unmounting
  useEffect(() => {
    console.log("inside mounting useEffect");
    console.log("current cardDetails.photo:", cardDetails.photo);
    const imageRect = absolutePosition(imageRef.current);
    // console.log("imageRect:", imageRect);
    return () => {
      console.log("cleanup function running");
      console.log("sliderVal:", sliderVal);
      // console.log("imageRef.current.style.top:", imageRef.current.style.top);
      // console.log("imageRef.current.style.left:", imageRef.current.style.left);
      cardDetails.photo.position = {
        top: Math.floor(imageRect.top),
        left: Math.floor(imageRect.left),
      };
      cardDetails.photo.scale = sliderVal;
      setCardDetails(cardDetails);
      console.log("updated cardDetails.photo:", cardDetails.photo);
    };
  }, [sliderVal]);

  const previewImage = (e) => {
    if (imageRef.current.width > imageRef.current.height) {
      imageRef.current.classList.add("horizontal");
    }
    if (imageRef.current.height > imageRef.current.width) {
      imageRef.current.classList.add("vertical");
    }
  };

  const resetImage = (e) => {
    imageRef.current.style.top = "50%";
    imageRef.current.style.left = "50%";
    imageRef.current.style.transform = "translate(-50%, -50%)";
    resizeRef.current.value = 120;
    if (imageRef.current.classList.contains("horizontal")) {
      imageRef.current.style.height = "120%";
    }
    if (imageRef.current.classList.contains("vertical")) {
      imageRef.current.style.width = "120%";
    }
  };

  const moveImage = (e) => {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    const imageRect = absolutePosition(imageRef.current);

    if (
      imageRect.left - newX <= Math.ceil(liveAreaRectRef.current.left) &&
      imageRect.right - newX >= Math.floor(liveAreaRectRef.current.right)
    ) {
      imageRef.current.style.left = imageRef.current.offsetLeft - newX + "px";
    }
    if (
      imageRect.top - newY <= Math.ceil(liveAreaRectRef.current.top) &&
      imageRect.bottom - newY >= Math.floor(liveAreaRectRef.current.bottom)
    ) {
      imageRef.current.style.top = imageRef.current.offsetTop - newY + "px";
    }
  };

  const resizeImage = (e) => {
    resizeRef.current.value = e.target.value;
    const newVal = resizeRef.current.value + "%";

    if (imageRef.current.classList.contains("horizontal")) {
      imageRef.current.style.height = newVal;
      // to do - resize result image
    }
    if (imageRef.current.classList.contains("vertical")) {
      imageRef.current.style.width = newVal;
      // to do - resize result image
    }

    const imageRect = absolutePosition(imageRef.current);

    // check if new edges of image rect are within live area rect, set to closest edge if not
    let newTop, newLeft;

    // manage left and right edges out of bounds
    // find new 'left' value from difference between imageRect and liveAreaRect, add or subtract from actual calculated left as necessary
    if (imageRect.left > liveAreaRectRef.current.left) {
      newLeft =
        parseInt(imageRef.current.style.left) -
        Math.ceil(imageRect.left - liveAreaRectRef.current.left);
    } else if (imageRect.right < liveAreaRectRef.current.right) {
      newLeft =
        parseInt(imageRef.current.style.left) +
        Math.ceil(liveAreaRectRef.current.right - imageRect.right);
    }

    // manage top and bottom edges out of bounds
    // find new 'top' value from difference between imageRect and liveAreaRect, add or subtract from actual calculated top as necessary
    if (imageRect.top > liveAreaRectRef.current.top) {
      newTop =
        parseInt(imageRef.current.style.top) -
        Math.ceil(imageRect.top - liveAreaRectRef.current.top);
    } else if (imageRect.bottom < liveAreaRectRef.current.bottom) {
      newTop =
        parseInt(imageRef.current.style.top) +
        Math.ceil(liveAreaRectRef.current.bottom - imageRect.bottom);
    }

    // assign new position
    if (newTop) {
      imageRef.current.style.top = newTop + "px";
    }
    if (newLeft) {
      imageRef.current.style.left = newLeft + "px";
    }

    setSliderVal(parseInt(resizeRef.current.value));
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
            src="/noface_samurai.png"
            alt=""
            id="draggable-image"
            draggable="false"
            ref={imageRef}
            onLoad={previewImage}
            onMouseDown={mouseDownHandler}
          />
        </div>
      </div>
      <input
        type="range"
        id="resize"
        className="slider"
        name="resize-slider"
        min="100"
        max="400"
        step="10"
        value={sliderVal}
        ref={resizeRef}
        onChange={resizeImage}
      />
      <button
        id="reset"
        className="button"
        type="button"
        ref={resetRef}
        onClick={resetImage}
      >
        Reset
      </button>
      <button className="button" id="upload" type="button">
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
