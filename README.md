# QuickRoute

[![npm version](https://img.shields.io/npm/v/@pandamime100hp/quickroute)](https://www.npmjs.com/package/@pandamime100hp/quickroute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/pandamime100hp/quickroute/actions/workflows/ci.yml/badge.svg)](https://github.com/pandamime100hp/quickroute/actions)

A TypeScript library for optimized Australian address parsing and validation, designed specifically for logistics operations. Built with extensibility to support multiple address providers, starting with TomTom API integration.

## Features

- 🇦🇺 Australian address validation and filtering
- 🚚 Logistics-optimized parsing algorithms
- 🔄 Provider-agnostic architecture (Initially TomTom)
- 📦 Tree-shaking friendly ES modules
- 🧪 100% test coverage enforcement

## Installation

```bash
npm install @pandamime100hp/quickroute
# or
yarn add @pandamime100hp/quickroute
```

## Configuration

### Environment Variables

Providers are configured through environment variables. This allows you to externally change the behaviour of the providers.

#### TomTom

The TomTom provider allows you to pass in various environment variables which allow you to simply how the APIs are called. For instance if the base URL is changed by TomTom (e.g., `api.tomtom.com` to `api.notsotomtom.com`) or maybe you would like to use a different region URL provided by TomTom (e.g., `kr-api.tomtom.com`), you can do this by setting the `TOMTOM_BASE_URL` environment variable. The provider uses the `process` Node package which reads in any `.env` files available on the root project folder. Below is a list of the environment variables that is used by the TomTom provider:

| Environment Variable    | Default Value      | Required |
|------------------------|--------------------|----------|
| `TOMTOM_API_KEY`       | None               | Yes      |
| `TOMTOM_BASE_URL`      | `api.tomtom.com`   | No       |
| `TOMTOM_API_VERSION`   | `2`                | No       |
| `TOMTOM_EXTENSION`     | `json`             | No       |

__NOTE:__ the API key has to methods of being passed in.
1. The parameter for the TomTom class (e.g. `new TomTom("YOUR_API_KEY_HERE")`)
2. The environment variable `TOMTOM_API_KEY`

__NOTE:__ if no environment variable is added to the .env file, the value is given a default value as shown above. 

## Usage

### Basic Example
```javascript
import { AddressProvider, TomTom } from "@pandamime100hp/quickroute";

const tomtom = new TomTom("YOUR_TOMTOM_API_KEY");
const provider = new AddressProvider(provider);

async function searchAddress() {
  const results = await provider.search("Sydney Opera House");
  console.log(results);
}

searchAddress();
```

### Using a Custom Provider
QuickRoute is designed to work with different geocoding providers. You can create your own provider by implementing the `AddressProvider` interface:

```javascript
import { Provider, Address } from "@pandamime100hp/quickroute";

class CustomProvider implements Provider {
  async search(query: string): Promise<Address[]> {
    return [{ street: "1 Custom St", city: "Melbourne", country: "Australia" }];
  }
}

const customProvider = new CustomProvider();
const geocoder = new Geocoder(customProvider);
```

## Testing

Run tests using:
```bash
npm run test
```

For test coverage:
```bash
npm run test:coverage
```

## License

This project is licensed under the MIT License.