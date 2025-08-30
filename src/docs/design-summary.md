# TODO Application Design Summary

This document summarizes the key design decisions for the command-line TODO application:

- **Storage:** Tasks are stored locally in a file.
- **Task Fields:** Each task has a name, description, and due date.
- **Task Completion:** Completed tasks are permanently deleted.
- **Task Editing:** Only adding and deleting tasks is supported; editing is not allowed.
- **Task Ordering:** Tasks are displayed by due date.
- **Recurring Tasks:** The same task can be added again at a different date to support recurrence.
- **Reminders:** No notifications or reminders; displaying the due date is sufficient.
- **User Support:** The application is intended for a single user only.
- **Import/Export:** No support for importing or exporting tasks.
- **Output Formatting:** Tasks should be displayed in a table format in the command-line interface.

Use this summary as a reference for implementation decisions and user experience.
