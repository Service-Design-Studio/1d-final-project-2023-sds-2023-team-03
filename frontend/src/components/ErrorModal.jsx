import { Modal } from '@mantine/core'

function ErrorModal({opened, open, close, title, content}) {
    return (
        <Modal opened={opened} onClose={close} title={title} centered={true}>
            {content}
        </Modal>
    )
}

export default ErrorModal;