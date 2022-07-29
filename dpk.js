const crypto = require("crypto");

function digestedHash(data) {
  return crypto
    .createHash("sha3-512")
    .update(data)
    .digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = TRIVIAL_PARTITION_KEY;
  if (event) {
    candidate = event.partitionKey
      ? String(event.partitionKey)
      : digestedHash(JSON.stringify(event));
  }

  return (candidate.length > MAX_PARTITION_KEY_LENGTH)
    ? digestedHash(candidate)
    : candidate;
};
