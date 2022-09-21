import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import swal from 'sweetalert'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import './forgot.css'

const ForgotPassword = () => {

const [send, setSend] = useState(false);
const [isOpenModal, openedModal, closeModal] = useModal(true);
const history = useHistory()


return (
    <div className="container-forgot">
        <div >
            <section>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validate={(values) => {
                        let errors = {};

                        //validacion email 
                        if (!values.email) {
                            errors.email = 'Please write your Email'
                        } else if (values.email.length < 4 || values.email.length > 40) {
                            errors.email = 'Must be a valid email'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)

                        resetForm();
                        axios.put('http://localhost:3001/auth/forgot-password', values)
                        swal({
                            title: '',
                            text: 'Please check your inbox ',
                            icon: 'info',
                            button: 'OK'
                        }).then(res => {
                            if (res) {
                                history.push('/reset-password')
                            }
                        })
                        resetForm();
                        console.log(values)
                    }}
                >

                    {({ errors }) => (
                        <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                        <Form>
                            <h3 className="modal-forgot-title">Password recovery</h3>
                            <h4 className="modal-forgot-text">Inform the email address used to create your account</h4>
                           
                            
                                <label htmlFor="email" className="modal-forgot-label">Email address: </label>

                                <Field
                                    type='text'
                                    id="email"
                                    placeholder="user@user.com"
                                    name="email"
                                />
                                <ErrorMessage name="email" component={() => (
                                    <div className="modal-forgot-errors">{errors.email}</div>
                                )} />
                            
                            <div className="container-forgot-button">
                                <button type="submit" className="modal-forgot-submit">Submit</button>
                                {send && <p>User added succecsfully</p>}
                            </div>
                        </Form>
                        </Modals>
                    )}
                </Formik>
            </section>
        </div>
    </div>
);
 }

export default ForgotPassword