const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns valid key for no partitionKey property", () => {
    const trivialKey = deterministicPartitionKey({ });
    expect(trivialKey.length).toBe(128);
  });

  it("Returns valid key for normal input", () => {
    const TEST_KEY = Array(255).fill('0').join('');
    trivialKey = deterministicPartitionKey({ partitionKey: TEST_KEY });
    expect(trivialKey.length).toBe(255);
  });

  it("Returns valid key for non-string partitionKey property", () => {
    const TEST_KEY = 34;
    const trivialKey = deterministicPartitionKey({ partitionKey: TEST_KEY });
    expect(trivialKey).toBe(String(TEST_KEY));
  });

  it("Returns valid when given event's partitionKey property has length of more than 256", () => {
    const TEST_KEY = Array(257).fill('0').join('');
    const trivialKey = deterministicPartitionKey({ partitionKey: TEST_KEY });
    expect(trivialKey.length).toBe(128);
  });
});
