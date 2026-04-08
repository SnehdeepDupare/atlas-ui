const trailer = document.getElementById("trailer");
const trailerOutline = document.getElementById("trailer-outline");

document.body.onpointermove = (e) => {
  const { clientX, clientY } = e;

  trailer.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    {
      duration: 1000,
      fill: "forwards",
    }
  );

  trailerOutline.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    {
      duration: 3000,
      fill: "forwards",
    }
  );
};
