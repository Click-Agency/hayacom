<h1 align="center">Hayacom</h1>

### Installation

```bash
$ npm install

# Development
$ npm run dev
$ npm run dev:backend
$ npm run dev:frontend


# Production
$ npm run build
$ npm run build:backend
$ npm run build:frontend

$ npm start
$ npm start:backend
$ npm start:frontend

```

#### [!CAUTION] You need to add the necessary environment variables to backend and frontend or once at the root of the app 

```env
#backend
PORT="your_server_port"

DB_URI="your_mongodb_uri"

AWS_ACCESS_KEY_ID="your_aws_key"
AWS_SECRET_ACCESS_KEY="your_aws_secert"
AWS_S3_REGION="your_aws_region"
AWS_S3_BUCKET_NAME="your_aws_bucket_name"
AWS_S3_ENDPOINT="your_aws_endpoint_of_bucket"

JWT_SECRET_ACCESS_TOKEN="your_jwt_token_to_login"
JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN="life_time_for_token_as_5m"

JWT_SECRET_REFRESH_TOKEN="your_jwt_secert_for_refresh"
JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN="life_time_for_secert_as_7d"

WEB_BASE_URL="https://your_frontend.uri"

#frontend
VITE_API_BASE_URL="https://your_backend.uri"
```
