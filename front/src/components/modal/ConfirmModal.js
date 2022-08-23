import { Modal, Button } from "react-bootstrap"
import ErrorUtil from "../../util/errorUtil"

/**
 * props
 * msg: string
 * isShow: boolean
 * onCloseButtonClickEvent: function
 * onCheckButtonClickEvent: function
 * ex) msg: "정말 삭제하시겠습니까?"
 *
 */
const ConfirmModal = ({
    msg,
    isShow,
    onCloseButtonClickEvent,
    onCheckButtonClickEvent,
}) => {
    // YES Button click한 경우 ConfirmModal을 사용하는 상위 컴포넌트에게
    // 전달받은 onCheckButtonClickEvent함수 props를 true의 값을 전달한다.
    // 그냥 Modal을 닫은 경우, 상위 컴포넌트에게 전달되는 값은 없다.
    const onCheckButtonClickEventHandler = () => {
        ErrorUtil.typeCheck(onCloseButtonClickEvent, "function")
        ErrorUtil.typeCheck(onCheckButtonClickEvent, "function")
        onCheckButtonClickEvent(true)
        onCloseButtonClickEvent(false)
    }

    return (
        <Modal
            show={isShow}
            onHide={onCloseButtonClickEvent}
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
                    onClick={onCheckButtonClickEventHandler}
                >
                    YES
                </Button>
                <Button variant="secondary" onClick={onCloseButtonClickEvent}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal
