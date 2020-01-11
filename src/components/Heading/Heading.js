import "./Heading.scss";

const Heading = () => {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");

    h1.innerHTML = "Webpack Header!!!";
    body.appendChild(h1);
}

export default Heading;