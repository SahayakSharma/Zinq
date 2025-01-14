
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./fbconfig";
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export class firebaseconfig {
  private static instance: firebaseconfig;
  private constructor() {

  }
  public static getInstance() {
    if (firebaseconfig.instance == null) {
      firebaseconfig.instance = new firebaseconfig();
    }
    return firebaseconfig.instance;
  }

  async createuserwithemailpassword(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.signinusingemailpassword(email, password);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  async signinusingemailpassword(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        return({
          status:"200",
          message:"User logged in"
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        return({
          status:"400",
          message:errorMessage
        })
      });
  }
  signout(){
    try{
      const logout=signOut(auth);
      return{
        status:"200",
        message:"logout successfull"
      }
    }
    catch(err){
      if(err instanceof Error)return{
        status:"400",
        message:err.message
      }
      else{
        return{
          status:"400",
          message:"Unknown error"
        }
      }
    }
    
  }



  
}