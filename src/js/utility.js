let absolutePosition = {};

// https://stackoverflow.com/a/32623832 answer by robocat
// improves getBoundingClientRect to respect page scroll, as well as some browsers' pinch-zoom
exports.absolutePosition = (el) => {
  let found,
    left = 0,
    top = 0,
    width = 0,
    height = 0,
    offsetBase = absolutePosition.offsetBase;

  if (!offsetBase && document.body) {
    offsetBase = absolutePosition.offsetBase = document.createElement("div");
    offsetBase.style.cssText = "position: absolute; left: 0; top: 0;";
    document.body.appendChild(offsetBase);
  }

  if (
    el &&
    el.ownerDocument === document &&
    "getBoundingClientRect" in el &&
    offsetBase
  ) {
    const boundingRect = el.getBoundingClientRect();
    const baseRect = offsetBase.getBoundingClientRect();
    found = true;
    left = boundingRect.left - baseRect.left;
    top = boundingRect.top - baseRect.top;
    width = boundingRect.right - boundingRect.left;
    height = boundingRect.bottom - boundingRect.top;
  }

  return {
    found,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
};
