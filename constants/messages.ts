export const messages = {
  auth: {
    errors: {
      login: "Login failed",
      signup: "Signup failed",
      logout: "Logout failed",
      incorrect_credentials: "Incorrect email or password",
      unauthorized: "Unauthorized",
      user_not_found: "User not found",
      user_already_exists: "User already exists",
    },
    success: {
      login: "Login successful",
      signup: "Signup successful",
      logout: "Logout successful",
    },
  },
  notes: {
    errors: {
      get_notes: "Failed to get notes",
      create_note: "Failed to create note",
      update_note: "Failed to update note",
      delete_note: "Failed to delete note",
    },
    success: {
      get_notes: "Successfully got notes",
      create_note: "Successfully created note",
      update_note: "Successfully updated note",
      delete_note: "Successfully deleted note",
    },
  },
  trash: {
    errors: {
      get_notes: "Failed to get notes in trash",
      empty_trash: "Failed to empty trash",
      restore_all_notes: "Failed to restore all notes",
      restore_note: "Failed to restore note",
    },
    success: {
      get_notes: "Successfully got notes in trash",
      empty_trash: "Successfully emptied trash",
      restore_all_notes: "Successfully restored all notes",
      restore_note: "Successfully restored note",
    },
  },
};
