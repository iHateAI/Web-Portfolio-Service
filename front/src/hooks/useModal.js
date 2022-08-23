import { useState } from "react"

// 현재는 없지만 추후에 생성될 수도 있는 각종 Modal에서 사용할 수 있는
// 공통 state 및 close event 함수
const useModal = (initialValue) => {
    const [isShow, setIsShow] = useState(initialValue)

    const onShowButtonClickEventHandler = () => {
        setIsShow(true)
    }

    const onCloseButtonClickEventHandler = () => {
        setIsShow(false)
    }

    return [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ]
}

export default useModal
