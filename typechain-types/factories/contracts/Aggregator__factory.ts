/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Aggregator,
  AggregatorInterface,
} from "../../contracts/Aggregator";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum Aggregator.Market",
        name: "market",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum Aggregator.Market",
        name: "from",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum Aggregator.Market",
        name: "to",
        type: "uint8",
      },
    ],
    name: "Rebalance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum Aggregator.Market",
        name: "market",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "AAVE_A_WETH_MAINNET_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AAVE_V3_MAINNET_POOL_ADDRESS_PROVIDER_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COMPOUND_V3_PROXY_MAINNET_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH_MAINNET_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Aggregator.Market",
        name: "_market",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "weth_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsDepositedInto",
    outputs: [
      {
        internalType: "enum Aggregator.Protocol",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rebalance",
    outputs: [
      {
        internalType: "enum Aggregator.Market",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e06040526002600060146101000a81548160ff0219169083600281111561002a57610029610201565b5b021790555034801561003b57600080fd5b5061005861004d61013560201b60201c565b61013d60201b60201c565b73c02aaa39b223fe8d0a0e5c4f27ead9083c756cc273ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050734d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e873ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff168152505073a17581a9e3356d9a858b789d68b4d866e593ae9473ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1681525050610230565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160a05160c0516117a6620002bb600039600081816108150152818161087201528181610e920152610f1501526000610a070152600081816102eb015281816103d901528181610673015281816108510152818161095b01528181610ae201528181610b8701528181610cf701528181610db201528181610e560152610f5101526117a66000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80637d7c2a1c116100715780637d7c2a1c146101305780638da5cb5b1461014e578063a4b1f5e41461016c578063bff0c0fc1461018a578063f2fde38b146101a8578063f4d4c9d7146101c4576100a9565b80630ffd2343146100ae57806329f053d1146100cc57806333bba7ed146100ea5780633ccfd60b14610108578063715018a614610126575b600080fd5b6100b66101e0565b6040516100c391906110c6565b60405180910390f35b6100d46101f8565b6040516100e19190611158565b60405180910390f35b6100f261020b565b6040516100ff91906110c6565b60405180910390f35b610110610223565b60405161011d919061118c565b60405180910390f35b61012e6104b8565b005b6101386104cc565b60405161014591906111ef565b60405180910390f35b610156610518565b60405161016391906110c6565b60405180910390f35b610174610541565b60405161018191906110c6565b60405180910390f35b610192610559565b60405161019f91906110c6565b60405180910390f35b6101c260048036038101906101bd919061123b565b610571565b005b6101de60048036038101906101d991906112b9565b6105f4565b005b73a17581a9e3356d9a858b789d68b4d866e593ae9481565b600060149054906101000a900460ff1681565b732f39d218133afab8f2b819b1066c7e434ad94e9e81565b600061022d610793565b6002808111156102405761023f6110e1565b5b600060149054906101000a900460ff166002811115610262576102616110e1565b5b036102a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029990611356565b60405180910390fd5b600160028111156102b6576102b56110e1565b5b600060149054906101000a900460ff1660028111156102d8576102d76110e1565b5b036103cb5760006102e7610811565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610344929190611376565b6020604051808303816000875af1158015610363573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038791906113d7565b507f08eeb3fbbcf9438aa9fd119952d5f42176050799525cdfc56f3793bb84bf35036001826040516103ba929190611404565b60405180910390a1809150506104b5565b60006103d56109f8565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610432929190611376565b6020604051808303816000875af1158015610451573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047591906113d7565b507f08eeb3fbbcf9438aa9fd119952d5f42176050799525cdfc56f3793bb84bf35036000826040516104a8929190611404565b60405180910390a1809150505b90565b6104c0610793565b6104ca6000610c25565b565b60006104d6610793565b7f3bf67ba50d14ef324f957808f6b00a77c3c857c9d41422fd2ab8dd6c3710327c6001600060405161050992919061142d565b60405180910390a16000905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b734d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e881565b73c02aaa39b223fe8d0a0e5c4f27ead9083c756cc281565b610579610793565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105df906114c8565b60405180910390fd5b6105f181610c25565b50565b6105fc610793565b60028081111561060f5761060e6110e1565b5b600060149054906101000a900460ff166002811115610631576106306110e1565b5b14610671576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106689061155a565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016106ce9392919061157a565b6020604051808303816000875af11580156106ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071191906113d7565b5060006002811115610726576107256110e1565b5b826002811115610739576107386110e1565b5b0361074c5761074781610ce9565b610756565b61075581610e54565b5b7f1d6bb4e583d7da423b02deed80468e06912cf1211d817d091ddddb7c63492e608282604051610787929190611404565b60405180910390a15050565b61079b610fee565b73ffffffffffffffffffffffffffffffffffffffff166107b9610518565b73ffffffffffffffffffffffffffffffffffffffff161461080f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610806906115fd565b60405180910390fd5b565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f3fef3a37f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016108c991906110c6565b602060405180830381865afa1580156108e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090a9190611632565b6040518363ffffffff1660e01b8152600401610927929190611376565b600060405180830381600087803b15801561094157600080fd5b505af1158015610955573d6000803e3d6000fd5b505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016109b291906110c6565b602060405180830381865afa1580156109cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f39190611632565b905090565b600080610a03610ff6565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b3827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6040518363ffffffff1660e01b8152600401610a80929190611376565b6020604051808303816000875af1158015610a9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac391906113d7565b508073ffffffffffffffffffffffffffffffffffffffff166369328dec7f00000000000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff306040518463ffffffff1660e01b8152600401610b419392919061165f565b6020604051808303816000875af1158015610b60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b849190611632565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610bde91906110c6565b602060405180830381865afa158015610bfb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1f9190611632565b91505090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000610cf3610ff6565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b382846040518363ffffffff1660e01b8152600401610d50929190611376565b6020604051808303816000875af1158015610d6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9391906113d7565b508073ffffffffffffffffffffffffffffffffffffffff1663617ba0377f0000000000000000000000000000000000000000000000000000000000000000843060006040518563ffffffff1660e01b8152600401610df494939291906116e9565b600060405180830381600087803b158015610e0e57600080fd5b505af1158015610e22573d6000803e3d6000fd5b5050505060008060146101000a81548160ff02191690836002811115610e4b57610e4a6110e1565b5b02179055505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b8152600401610ecf929190611376565b6020604051808303816000875af1158015610eee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1291906113d7565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f2b9fdb87f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b8152600401610f8e929190611376565b600060405180830381600087803b158015610fa857600080fd5b505af1158015610fbc573d6000803e3d6000fd5b505050506001600060146101000a81548160ff02191690836002811115610fe657610fe56110e1565b5b021790555050565b600033905090565b600080732f39d218133afab8f2b819b1066c7e434ad94e9e73ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611058573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107c9190611743565b90508091505090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110b082611085565b9050919050565b6110c0816110a5565b82525050565b60006020820190506110db60008301846110b7565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110611121576111206110e1565b5b50565b600081905061113282611110565b919050565b600061114282611124565b9050919050565b61115281611137565b82525050565b600060208201905061116d6000830184611149565b92915050565b6000819050919050565b61118681611173565b82525050565b60006020820190506111a1600083018461117d565b92915050565b600381106111b8576111b76110e1565b5b50565b60008190506111c9826111a7565b919050565b60006111d9826111bb565b9050919050565b6111e9816111ce565b82525050565b600060208201905061120460008301846111e0565b92915050565b600080fd5b611218816110a5565b811461122357600080fd5b50565b6000813590506112358161120f565b92915050565b6000602082840312156112515761125061120a565b5b600061125f84828501611226565b91505092915050565b6003811061127557600080fd5b50565b60008135905061128781611268565b92915050565b61129681611173565b81146112a157600080fd5b50565b6000813590506112b38161128d565b92915050565b600080604083850312156112d0576112cf61120a565b5b60006112de85828601611278565b92505060206112ef858286016112a4565b9150509250929050565b600082825260208201905092915050565b7f4e6f7468696e6720746f20776974686472617700000000000000000000000000600082015250565b60006113406013836112f9565b915061134b8261130a565b602082019050919050565b6000602082019050818103600083015261136f81611333565b9050919050565b600060408201905061138b60008301856110b7565b611398602083018461117d565b9392505050565b60008115159050919050565b6113b48161139f565b81146113bf57600080fd5b50565b6000815190506113d1816113ab565b92915050565b6000602082840312156113ed576113ec61120a565b5b60006113fb848285016113c2565b91505092915050565b600060408201905061141960008301856111e0565b611426602083018461117d565b9392505050565b600060408201905061144260008301856111e0565b61144f60208301846111e0565b9392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006114b26026836112f9565b91506114bd82611456565b604082019050919050565b600060208201905081810360008301526114e1816114a5565b9050919050565b7f596f752073686f756c64207769746864726177206265666f72652072652d646560008201527f706f736974000000000000000000000000000000000000000000000000000000602082015250565b60006115446025836112f9565b915061154f826114e8565b604082019050919050565b6000602082019050818103600083015261157381611537565b9050919050565b600060608201905061158f60008301866110b7565b61159c60208301856110b7565b6115a9604083018461117d565b949350505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006115e76020836112f9565b91506115f2826115b1565b602082019050919050565b60006020820190508181036000830152611616816115da565b9050919050565b60008151905061162c8161128d565b92915050565b6000602082840312156116485761164761120a565b5b60006116568482850161161d565b91505092915050565b600060608201905061167460008301866110b7565b611681602083018561117d565b61168e60408301846110b7565b949350505050565b6000819050919050565b600061ffff82169050919050565b6000819050919050565b60006116d36116ce6116c984611696565b6116ae565b6116a0565b9050919050565b6116e3816116b8565b82525050565b60006080820190506116fe60008301876110b7565b61170b602083018661117d565b61171860408301856110b7565b61172560608301846116da565b95945050505050565b60008151905061173d8161120f565b92915050565b6000602082840312156117595761175861120a565b5b60006117678482850161172e565b9150509291505056fea264697066735822122058efed3bd0565c98842a4cc4c62bb50970d43671a2b59d11620757cdfc4ebe1b64736f6c63430008120033";

type AggregatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AggregatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Aggregator__factory extends ContractFactory {
  constructor(...args: AggregatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Aggregator> {
    return super.deploy(overrides || {}) as Promise<Aggregator>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Aggregator {
    return super.attach(address) as Aggregator;
  }
  override connect(signer: Signer): Aggregator__factory {
    return super.connect(signer) as Aggregator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AggregatorInterface {
    return new utils.Interface(_abi) as AggregatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Aggregator {
    return new Contract(address, _abi, signerOrProvider) as Aggregator;
  }
}
