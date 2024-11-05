import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text
} from "@chakra-ui/react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfReader = ({ isOpen, onClose,pdf }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Xem sách</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '750px',
                            }}
                        >
                            {pdf ? (
                                <Viewer fileUrl={pdf} />
                            ) : (
                                <Text fontSize="lg" color="gray.500">Không có file PDF</Text>
                            )}
                        </div>
                    </Worker>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default PdfReader;
