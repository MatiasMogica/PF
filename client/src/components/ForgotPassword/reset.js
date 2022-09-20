import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import swal from 'sweetalert'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import './reset.css'

const Reset = (props) => {

    const [send, setSend] = useState(false);
    const [isOpenModal, openedModal, closeModal] = useModal(true)
    const history = useHistory()

    return (
        <div>
            <div>
                <section>
                    <Formik
                        initialValues={{

                            newP: "",
                            resetToken: ""

                        }}
                        validate={(values) => {
                            let errors = {};

                            if (!values.newP) {
                                errors.newP = 'Please write your password'
                            } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(values.newP)) {
                                errors.newP = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 32'
                            } else if (!values.resetToken) {
                                errors.resetToken = 'Please enter the token that we sent you by mail'
                            }
                            return errors;
                        }}
                        onSubmit={(values, { resetForm }) => {
                             console.log(values.newP)

                            resetForm();
                            axios.put('http://localhost:3001/auth/reset-password', values)
                            swal({
                                title: 'Congratulation',
                                text: 'Password changed successfully',
                                icon: 'success',
                                button: 'OK'
                            }).then(res => {
                                if (res) {
                                    history.push('/')
                                }
                            })

                            resetForm();

                        }}
                    >
                        {({ errors }) => (
                            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                            <Form>
                                <h3 className="modal-reset-title">Check your email!</h3>

                                <p className="modal-reset-text">You have 20 minutes to enter the token sent by mail, and change your new password </p>
                                <div>
                                <label htmlFor="resetToken" className="modal-reset-label">Token: </label>
                                    <Field
                                        type='text'
                                        id="token"
                                        placeholder="token"
                                        name="resetToken"
                                    />
                                    <ErrorMessage name="resetToken" component={() => (
                                    <div className="modal-reset-errors">{errors.resetToken}</div>)}/>
                                </div>
                                    <div>
                                        <label htmlFor="newP" className="modal-reset-label">New password: </label>
                                        <Field
                                            type='password'
                                            id="password"
                                            placeholder="********"
                                            name="newP"
                                        />
                                        <ErrorMessage name="newP" component={() => (
                                            <div className="modal-reset-errors">{errors.newP}</div>
                                        )} />
                                    </div>

                                <div className="container-reset-button">
                                    <button type="submit" className="modal-reset-submit">Change</button>
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
};

export default Reset;