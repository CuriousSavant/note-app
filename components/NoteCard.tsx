import React from 'react'
import {
    Box,
    Typography,
    IconButton,
    Stack,
} from '@mui/material';
import { Delete, ModeEdit, PushPin } from '@mui/icons-material'
import { PropsNote } from '@/lib/propsState';

interface Props {
    note: PropsNote,
    deleteNote: (id: number) => void;
    handleStartEdit: (notes: any) => void;
    pinMark: (id: number, currentPinStatus: boolean) => void
}

const NoteCard = ({ note, deleteNote, handleStartEdit, pinMark }: Props) => {
    return (
        <>
            <Box
                sx={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    backgroundColor: "#fff",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 24px",
                    },
                    maxWidth: "400px",
                    margin: "20px auto",
                }}
            >
                <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"h1"} sx={{ fontWeight: 700, fontSize: "18px", mb: "10px", color: "#333" }}>
                        {note.title}
                    </Typography>
                    <IconButton onClick={() => pinMark(note.id, note.pin)}>
                        <PushPin sx={{ fontSize: "20px", color: note.pin ? "blue" : "gray" }} />
                    </IconButton>
                </Stack>
                <Typography component={'p'} sx={{ fontSize: "12px", mb: "8px", color: "gray" }}>
                    {note.createAt.toString()}
                </Typography>
                <Typography component={"p"} sx={{ fontSize: "14px", color: "#555", mb: "12px", lineHeight: "1.6" }}>
                    {note.content ? note.content : <Typography component={"p"} sx={{ color: "#aaa", fontStyle: "italic" }}>Content No Found</Typography>}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ mt: "10px", display: "flex", flexWrap: "wrap" }}>
                        {note.tags.length > 0 ? (
                            note.tags.map((tag, index) => (
                                <Typography
                                    key={index}
                                    component={"span"}
                                    sx={{
                                        fontSize: "12px",
                                        color: "#1976d2",
                                        backgroundColor: "#e3f2fd",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        mr: "4px",
                                        mb: "4px",
                                    }}
                                >
                                    #{tag}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant='caption' sx={{ color: "#aaa" }}>No Tags</Typography>
                        )}
                    </Box>
                    <Box>
                        <IconButton onClick={() => handleStartEdit(note)} sx={{ color: "#1976d2" }}>
                            <ModeEdit sx={{ fontSize: "18px" }} />
                        </IconButton>
                        <IconButton onClick={() => deleteNote(note.id)} sx={{ color: "#d32f2f" }}>
                            <Delete sx={{ fontSize: "18px" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default NoteCard;