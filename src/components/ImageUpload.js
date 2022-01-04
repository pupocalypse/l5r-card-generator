// import { useState, useEffect, useRef } from "react";
// import Croppie from "croppie";

import { useEffect } from "react/cjs/react.development";

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
  let image;
  // const reset = document.getElementById("reset");
  let resize;
  let liveAreaRect;

  let { startX, startY, newX, newY } = cardState.photo.position;

  useEffect(() => {
    liveAreaRect = document
      .querySelector(".preview-container__live-area")
      .getBoundingClientRect();
    image = document.getElementById("draggable-image");
    resize = document.getElementById("resize");
    previewImage();
  });

  const previewImage = (e) => {
    if (image.width > image.height) {
      image.classList.add("horizontal");
    }
    if (image.height > image.width) {
      image.classList.add("vertical");
    }
  };

  const resetImage = (e) => {
    image.style.top = "50%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    resize.value = 120;
    if (image.classList.contains("horizontal")) {
      image.style["max-height"] = "120%";
    }
    if (image.classList.contains("vertical")) {
      image.style["max-width"] = "120%";
    }
  };

  const moveImage = (e) => {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    const imageRect = image.getBoundingClientRect();

    if (
      imageRect.left - newX <= Math.ceil(liveAreaRect.left) &&
      imageRect.right - newX >= Math.floor(liveAreaRect.right)
    ) {
      image.style.left = image.offsetLeft - newX + "px";
    }
    if (
      imageRect.top - newY <= Math.ceil(liveAreaRect.top) &&
      imageRect.bottom - newY >= Math.floor(liveAreaRect.bottom)
    ) {
      image.style.top = image.offsetTop - newY + "px";
    }
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
        <div className="preview-container__live-area">
          <img
            src="/noface_samurai.png"
            alt=""
            id="draggable-image"
            draggable="false"
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
        value="120"
      />
      <button id="reset" className="button" type="button" onClick={resetImage}>
        Reset
      </button>
      <button className="button" id="upload" type="button">
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
