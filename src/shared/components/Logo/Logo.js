import React from "react";

import classes from "./Logo.module.scss";

const logo = (props) => (
  <div className={classes.container}>
    <svg
      className={classes.logo}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <defs>
      <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#4d2cad" stopOpacity="100%" />
        <stop offset="100%" stopColor="#EC2552" stopOpacity="100%" />
      </linearGradient>
    </defs> */}
      {/* <g fill="url(#linear-gradient)"> */}
      <path d="m149.867188 61.296875c63.019531-40.292969 149.246093-40.292969 212.265624 0 .707032 32.480469 27.222657 58.703125 59.867188 58.703125 33.089844 0 60-26.910156 60-60s-26.910156-60-60-60c-22.558594 0-42.007812 12.65625-52.253906 31.101562-68.835938-39.621093-158.660156-39.621093-227.492188 0-10.246094-18.445312-29.695312-31.101562-52.253906-31.101562-33.089844 0-60 26.910156-60 60s26.910156 60 60 60c32.644531 0 59.160156-26.222656 59.867188-58.703125zm0 0" />
      <path d="m316 301c0-33.089844-26.910156-60-60-60s-60 26.910156-60 60 26.910156 60 60 60 60-26.910156 60-60zm0 0" />
      <path d="m422 120c-49.628906 0-90 40.371094-90 90v46c0 8.289062 6.710938 15 15 15h99.363281c-14.140625 60.003906-56.597656 109.363281-113.535156 133.796875-15.769531-26.121094-44.152344-43.796875-76.828125-43.796875s-61.058594 17.675781-76.828125 43.800781c-56.941406-24.4375-99.398437-73.796875-113.535156-133.800781h99.363281c8.289062 0 15-6.710938 15-15v-46c0-49.628906-40.371094-90-90-90s-90 40.371094-90 90v46c0 8.289062 6.710938 15 15 15h20.023438c14.730468 72.535156 64.742187 132.523438 132.914062 161.535156-1.246094 5.964844-1.9375 12.132813-1.9375 18.464844v46c0 8.289062 6.710938 15 15 15h150c8.289062 0 15-6.710938 15-15v-46c0-6.332031-.691406-12.5-1.9375-18.464844 68.171875-29.011718 118.183594-89 132.914062-161.535156h20.023438c8.289062 0 15-6.710938 15-15v-46c0-49.628906-40.371094-90-90-90zm0 0" />
      {/* </g> */}
    </svg>
  </div>
);

export default logo;
