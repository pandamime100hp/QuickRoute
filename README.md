# QuickRoute

[![npm version](https://img.shields.io/npm/v/quickroute)](https://www.npmjs.com/package/quickroute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/quickroute/geocoding-library/actions/workflows/ci.yml/badge.svg)](https://github.com/quickroute/geocoding-library/actions)

A TypeScript library for optimized Australian address parsing and validation, designed specifically for logistics operations. Built with extensibility to support multiple geocoding providers, starting with TomTom API integration.

## Features

- 🇦🇺 Australian address validation and filtering
- 🚚 Logistics-optimized parsing algorithms
- 🔄 Provider-agnostic architecture (TomTom first)
- 📦 Tree-shaking friendly ES modules
- 🧪 100% test coverage enforcement
- 🐳 Consistent Dockerized testing environment

## Installation

```bash
npm install quickroute
# or
yarn add quickroute
```

## Development

### Docker Testing Setup
# Build and test with Docker
```bash
docker-compose build
docker-compose run --rm test

# With custom API key
TOMTOM_API_KEY=your_key docker-compose run --rm test
```