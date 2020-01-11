import HelloWebpackButton from "./components/HelloWebpackButton";
import addImage from "./add-image";
import Heading from "./components/Heading";

HelloWebpackButton();
addImage();
Heading();

if(process.env.NODE_ENV === "production"){
    console.log("Production Mode");
} else if (process.env.NODE_ENV === "development"){
    console.log("Development Mode");
}