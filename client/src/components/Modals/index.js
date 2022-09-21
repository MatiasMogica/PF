import './index.css'

const Modals = ({children, isOpenModal, closeModal}) => {
    return(
        <section className={`modal ${isOpenModal && 'is-open'}`}>
            <div className='modal-container'>
                {children}
                {/* <button className='modal-close' onClick={closeModal}>CLOSE</button> */}
            </div>
        </section>
    )
}

export default Modals;