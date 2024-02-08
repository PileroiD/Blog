import styled from "styled-components";
import { Button } from "../button-component/button-component";
import { useDispatch, useSelector } from "react-redux";
import {
    selectModalIsOpen,
    selectModalOnCancel,
    selectModalOnConfirm,
    selectModalText,
} from "../../selectors";
import { closeModal } from "../../actions";

const ModalContainer = ({ className }) => {
    const isOpen = useSelector(selectModalIsOpen);
    const text = useSelector(selectModalText);
    const onConfirm = useSelector(selectModalOnConfirm);
    const onCancel = useSelector(selectModalOnCancel);
    const dispatch = useDispatch();

    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            <div className="overlay" onClick={() => dispatch(closeModal)}></div>
            <div className="box">
                <div
                    className="close-button"
                    onClick={() => dispatch(closeModal)}
                >
                    &times;
                </div>
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width={"120px"} onClick={onConfirm}>
                        Yes
                    </Button>
                    <Button width={"120px"} onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Modal = styled(ModalContainer)`
    position: fixed;
    z-index: 20;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    & .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    & .box {
        position: relative;
        width: 400px;
        min-height: 100px;
        text-align: center;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translateY(-50%);
        transform: translateX(-50%);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        & .buttons {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            column-gap: 10px;
        }

        & .close-button {
            position: absolute;
            font-size: 30px;
            top: -4px;
            right: 10px;
            cursor: pointer;
        }
    }
`;
