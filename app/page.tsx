'use client'
import React from 'react'
import { Add } from '@mui/icons-material';
import Modal from 'react-modal';
import FormAddNote from '@/components/FormAddNote';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import { Box, Button, Grid, Typography } from '@mui/material';
import useNotes from '@/hooks/useNotes';

Modal.setAppElement('#root')

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#fff",
    maxWidth: "800px",
    height: "auto",
    marginTop: "80px",
    margin: "auto",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #ddd",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 16px",
  },
};

const App: React.FC = () => {
  const {
    isOpenEditModal,
    setIsOpenEditModal,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    handleNoteSubmit,
    allNotes,
    deleteNote,
    handleStartEdit,
    editId,
    searchItem,
    setSearchItem,
    isPin,
    setIsPin, 
    pinMark,
    notePin,
  } = useNotes()


  return (
    <>
      <Box sx={{ maxWidth: { xs: "sm", md: "lg" }, mx: "auto", pt: "10px" }}>
        <Navbar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          notePin={notePin}
          isPin={isPin}
          setIsPin={setIsPin}
        // setFilter={setFilter}
        />
        {allNotes.length !== 0 ? (
          <Grid container sx={{ mt: "4px", width: "100%" }}>
            {notePin.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id} sx={{ padding: "6px" }}>
                <NoteCard
                  note={note}
                  deleteNote={deleteNote}
                  handleStartEdit={handleStartEdit}
                  pinMark={pinMark}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Typography variant='h3'>
              ไม่มีโน้ต
            </Typography>
          </Box>
        )}
        <Button
          variant='contained'
          sx={{ position: "fixed", right: 20, bottom: 20 }}
          onClick={() => setIsOpenEditModal({ isOpen: true, type: "add", data: null })}
        >
          <Add sx={{ fontSize: "30px", color: "white" }} />
        </Button>
      </Box>
      <Modal
        isOpen={isOpenEditModal.isOpen}
        onRequestClose={() => setIsOpenEditModal({ isOpen: false, data: null, type: "" })}
        style={customModalStyles}
        className={"root"}
        ariaHideApp={false}
      >
        <FormAddNote
          isOpenEditModal={isOpenEditModal}
          setIsOpenEditModal={setIsOpenEditModal}
          title={title}
          content={content}
          tags={tags}
          setTitle={setTitle}
          setContent={setContent}
          setTags={setTags}
          handleNoteSubmit={handleNoteSubmit}
          editId={editId}
        />
      </Modal>
    </>
  );
};

export default App;