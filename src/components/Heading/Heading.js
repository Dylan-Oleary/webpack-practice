import "./Heading.scss";

const Heading = pageName => {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");

    h1.innerHTML = `Welcome to the ${pageName} page!`;
    body.appendChild(h1);
}

export default Heading;