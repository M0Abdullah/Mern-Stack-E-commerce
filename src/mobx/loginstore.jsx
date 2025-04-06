import { makeAutoObservable } from "mobx";

class loginstore {
  Adminadd = false;
  constructor() {
    makeAutoObservable(this);
    this.loadState();
  }

  setadmin(status) {
    this.Adminadd = status;
    console.log(status, "checking stats");
    localStorage.setItem("Adminadd", status);
  }
  loadState() {
    const savedState = localStorage.getItem("Adminadd");
      this.Adminadd = JSON.parse(savedState);
  }
}
const Loginstore = new loginstore();
export default Loginstore;
