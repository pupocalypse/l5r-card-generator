// import { useState, useEffect, useRef } from "react";
// import Croppie from "croppie";

import { useState, useEffect, useRef } from "react/cjs/react.development";
import { absolutePosition } from "../js/utility";

// function ImageUpload({ cardState, setCardState }) {
//   const [croppie, setCroppie] = useState(null);
//   const croppieContainer = useRef();
//   const options = {
//     viewport: {
//       width: 168,
//       height: 159,
//     },
//     boundary: {
//       width: "100%",
//       height: "14rem",
//     },
//   };

//   console.log("croppie:", croppie);
//   console.log("croppieContainer:", croppieContainer);

//   useEffect(() => {
//     // console.log("useEffect triggered");
//     const croppieRef = croppieContainer.current;
//     console.log("croppieRef:", croppieRef);
//     const card = { ...cardState };

//     const event = () => {
//       console.log("update event on croppieRef was run");
//       croppie.result("blob").then((result) => {
//         result = URL.createObjectURL(result);
//         card.photo.cropped = result;
//         setCardState(card);
//       });
//     };

//     if (croppie != null) {
//       console.log("croppie is not null, proceeding to set cropped card state");
//       croppieRef.addEventListener("update", event);
//       return () => {
//         croppieRef?.removeEventListener("update", event);
//       };
//     }

//     addCroppieInstance();
//   });
//   // }, [cardState, setCardState, croppie]);

//   const addCroppieInstance = (photo) => {
//     let croppieInstance;
//     if (!croppie) {
//       croppieInstance = new Croppie(croppieContainer.current, options);
//     } else {
//       croppieInstance = croppie;
//     }
//     croppieInstance.bind({ url: photo });
//     setCroppie(croppieInstance);
//   };

//   // const changeImage = (e) => {
//   //   const card = { ...cardState };
//   //   card.photo.original = URL.createObjectURL(e.target.files[0]);
//   //   card.photo.cropped = URL.createObjectURL(e.target.files[0]);
//   //   card.photo.filename = e.target.files[0].name;
//   //   setCardState(card);
//   //   addCroppieInstance(card.photo.original);
//   // };

//   // const resetImage = (e) => {
//   //   e.preventDefault();
//   //   // const card = { ...cardState };
//   //   // card.photo.original = null;
//   //   // card.photo.cropped = null;
//   //   // card.photo.filename = "";
//   //   // setCroppie(null);
//   //   // setCardState(card);
//   // };

//   return (
//     <div id="img-uploader" className="uploader" role="tabpanel">
//       <div className="img-edit" id="croppie" ref={croppieContainer}></div>
//       {/* <div className="img-edit" id="croppie"></div> */}
//       <div className="img-upload">
//         <form className="img-upload__form">
//           <p className="img-upload__file-name">
//             {cardState.photo.filename
//               ? cardState.photo.filename
//               : "no file selected"}
//           </p>
//           {/* {croppie ? (
//             ""
//           ) : (
//             <input
//               type="range"
//               className="img-upload__input-placeholder"
//               step="0.0001"
//               min="0.2901"
//               max="1.5000"
//               value="0.5508"
//               disabled
//             />
//           )} */}
//           <div className="img-upload__buttons-wrapper">
//             <label
//               className="img-upload__upload-button button"
//               htmlFor="file-upload"
//             >
//               <input
//                 type="file"
//                 className="img-upload__input vis-hidden"
//                 id="file-upload"
//                 name="file-upload"
//                 accept="image/*"
//                 // onChange={changeImage}
//               />
//               Choose a file
//             </label>
//             {/* <button className="button" onClick={resetImage} type="button"> */}
//             <button className="button" type="button">
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ImageUpload;

function ImageUpload({ cardState, setCardState }) {
  let imageRef = useRef(null),
    resetRef = useRef(null),
    resizeRef = useRef(null),
    liveAreaRef = useRef(null),
    liveAreaRectRef = useRef(null);
  let { startX, startY, newX, newY } = cardState.photo.position;
  const [sliderVal, setSliderVal] = useState(120);

  useEffect(() => {
    liveAreaRectRef.current = absolutePosition(liveAreaRef.current);
    let sliderMax = liveAreaRectRef.current.width * 4;
    console.log("sliderMax:", sliderMax);

    if (imageRef.current.style.width > imageRef.current.style.height) {
      imageRef.current.classList.add("horizontal");
    } else if (imageRef.current.style.height > imageRef.current.style.width) {
      imageRef.current.classList.add("vertical");
    } else {
      // default horizontal for square images
      imageRef.current.classList.add("horizontal");
    }
    console.log("imageRef.current:", imageRef.current);
    console.log(
      "imageRef.current.naturalWidth:",
      imageRef.current.naturalWidth
    );
    console.log(
      "imageRef.current.naturalHeight:",
      imageRef.current.naturalHeight
    );

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
    const newVal = e.target.value + "%";

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

    setSliderVal(e.target.value);
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
