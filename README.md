# @justomx/project_name

First, you need to change the project name in the following files:

- `package.json`
- `README.md`

Specify the first version of this project in `package.json`.

## Requirements

You need to install the following dependencies.

1. [Node.js](https://nodejs.org/en): the min version required is `20`,
   the latest LTS version.

> **Recomendation**:
> If you have installed `nvm` in your PC, only you need to run the following command:

```sh
nvm install
nvm use
```

To set the default version, you can run the following command:

```sh
nvm alias default 20
```

2. [Docker](https://docker.com): recommended in the latest version

3. [Git](https://git-scm.com/): recommended in the latest version

## Set-up

- Run `npm install` in the root directory. This going to install all
  the required packages.
- Run `npm run dev` to start the server on port `8080`
- Enjoy! 😊

If you need to change configuration you need to add `.env` file and
push the following environment variables:

| Environment variable        | Description                                                 | Default value |
| --------------------------- | ----------------------------------------------------------- | ------------- |
| NODE_ENV                    | Application execution environment (e.g., local, production) | local         |
| PORT                        | Port on which the application listens for requests          | 8080          |
| HEALTH_PING_THRESHOLD       | Application health threshold (decimal value, 0.8 = 80%)     | 0.8           |
| HEALTH_DISK_SPACE_THRESHOLD | Disk space threshold in bytes (25MB = 26214400 bytes)       | 26214400      |

## Test

Only run `npm test` to execute all tests.
