export const UtilityDate = {
  // Timestamp from MySQL source is UTC but JS Date function assumes local timezone.
  // Explicitly tell JS that imported date is UTC so we're comparing two localized timestamps.
  getUTCDate: (timestamp: string) => {
    return new Date(timestamp + ' UTC');
  }
};

export default UtilityDate;
