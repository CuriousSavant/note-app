import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { Close } from '@mui/icons-material';
import TagsNote from './TagsNote';

interface PropsState {
    title: string;
    content: string;
    tags: string[];
    isOpenEditModal: { isOpen: boolean, type: string, data: string | null };
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<any>>;
    editId: number | null;
    handleNoteSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormAddNote: React.FC<PropsState> = ({
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isOpenEditModal,
    setIsOpenEditModal,
    handleNoteSubmit,
    editId,
}) => {
    return (
        <Box
            sx={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 24px",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "16px",
                }}
            >
                <Typography variant="h5" sx={{ mt: "4px" }}>
                    Add New Note
                </Typography>
                <Button onClick={() => setIsOpenEditModal(!isOpenEditModal.isOpen)}>
                    <Close />
                </Button>
            </Box>
            <form
                style={{ display: "flex", flexDirection: "column", width: "100%" }}
                onSubmit={handleNoteSubmit}
            >
                <TextField
                    autoFocus
                    label="Title"
                    variant="outlined"
                    size="small"
                    sx={{
                        mb: "10px",
                        width: "100%",
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={5}
                    placeholder="Type your content..."
                    sx={{ width: "100%", mb: "10px" }}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <Box>
                    <TagsNote tags={tags} setTags={setTags} />
                </Box>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    sx={{
                        mb: "14px",
                        width: "100%",
                        alignSelf: "center",
                    }}
                >
                    {editId !== null ? "edit" : "add"}
                </Button>
            </form>
        </Box>
    )
}

export default FormAddNote