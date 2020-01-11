import "./HelloWebpackButton.scss";

const HelloWebpackButton = () => {
    const buttonCSSClass = "hello-webpack-btn";

    const button = document.createElement("button");
    button.innerHTML = "Hello Webpack!";
    button.classList.add(buttonCSSClass);
    
    const body = document.querySelector("body");
    body.appendChild(button);

    button.onclick = () => {
        const p = document.createElement("p");
        p.innerHTML = "Hello again webpack!";
        p.classList.add("hello-webpack-text")
        body.appendChild(p);
    }
}

export default HelloWebpackButton;