export const sanitizeTitle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove all special characters except spaces
      .replace(/\s+/g, "-"); // Replace spaces with a single hyphen
  };