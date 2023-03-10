import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect"
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';


const registerValidation = Yup.object({
  first_name: Yup.string()
    .required("What's your First name ?")
    .min(2, "Fisrt name must be between 2 and 16 characters.")
    .max(16, "Fisrt name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  last_name: Yup.string()
    .required("What's your Last name ?")
    .min(1, "Last name must be between 2 and 16 characters.")
    .max(16, "Last name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
})


const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
}

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(userInfos)
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender
  } = user
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }
  const tempYear = new Date().getFullYear()
  const years = Array.from(new Array(108), (val, index) => tempYear - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)
  const getdays = () => {
    return new Date(bYear, bMonth, 0).getDate()
  }
  const days = Array.from(new Array(getdays()), (val, index) => 1 + index)

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("")

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      // console.log(data.token, 'signup');
      console.log(data.message,'signup');
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data.user });
        Cookies.set("user", JSON.stringify(data.user))
        navigate("/")
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message)
    }


  }
  return (
    <div className="blur1">
      <div className="register">
        <div className="register_header">
          {/* <i className="exit_icon"
          ></i> */}
          <div style={{display:"flex",justifyContent:"flex-end",cursor:"pointer"}} >

          <CancelIcon onClick={() => {
            setVisible(false)
          }} />
          </div>
          <span>Sign Up</span>
          <span>Its really quick</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast_14 = new Date(1970 + 14, 0, 1);
            let nomore_than_70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast_14) {
              setDateError("It looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.");
            } else if (current_date - picked_date > nomore_than_70) {
              setDateError("It looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.");
            } else if (gender === "") {
              setDateError("")
              setGenderError("Please choose a gender. You can change who can see this later.");
            } else {
              setDateError("")
              setGenderError("");
              registerSubmit();
            }
          }}>

          {
            (formik) => (
              <Form className="register_form">
                <div className="reg_line">
                  <RegisterInput type="text"
                    placeholder="first name"
                    name="first_name"
                    onChange={handleRegisterChange} />

                  <RegisterInput type="text"
                    placeholder="last name"
                    name="last_name"
                    onChange={handleRegisterChange} />
                </div>
                <div className="reg_line">
                  <RegisterInput type="text"
                    placeholder="Mobile number or email address"
                    name="email"
                    onChange={handleRegisterChange} />
                </div>
                <div className="reg_line">
                  <RegisterInput type="password"
                    placeholder="New Password"
                    name="password"
                    onChange={handleRegisterChange} />
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Date of Birth <i className="info_icon"></i>
                  </div>
                  <DateOfBirthSelect bDay={bDay} bMonth={bMonth} bYear={bYear} days={days} months={months} years={years} dateError={dateError} handleRegisterChange={handleRegisterChange} />
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Gender <i className="info_icon"></i>
                  </div>
                  <GenderSelect genderError={genderError} handleRegisterChange={handleRegisterChange} />
                </div>
                <div className="reg_btn_wrapper">
                  <button className="blue_btn open_signup">Sign up</button>
                </div>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>}
                {success && <div className="success_text">{success}</div>}
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}
