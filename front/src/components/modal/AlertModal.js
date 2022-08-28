import { Modal, Button } from "react-bootstrap"
import ErrorUtil from "../../util/errorUtil"

/**
 * props
 * msg: string
 * isShow: boolean
 * onCloseButtonClickEvent: function
 */
const AlertModal = ({ msg, isShow, onCloseButtonClickEvent }) => {
    const onCloseButtonClickEventHanlder = () => {
        ErrorUtil.typeCheck(onCloseButtonClickEvent, "function")
        onCloseButtonClickEvent(false)
    }

    return (
        <Modal
            show={isShow}
            onHide={onCloseButtonClickEventHanlder}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={onCloseButtonClickEventHanlder}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertModal
