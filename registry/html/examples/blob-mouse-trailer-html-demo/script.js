const trailer = document.getElementById("trailer");

document.body.onpointermove = (e) => {
  const { clientX, clientY } = e;

  trailer.animate(
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
