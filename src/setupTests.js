import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const fbScript = document.createElement("script");
fbScript.id = "facebook-jssdk";

document.body.appendChild(fbScript);
