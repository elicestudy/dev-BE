# Node.js 14 버전과 Alpine Linux를 기반으로 한 공식 이미지를 사용합니다.
FROM node:18-alpine

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 패키지 파일을 복사하여 종속성을 설치합니다.
COPY package*.json ./
RUN npm install

# 소스 코드를 복사합니다.
COPY . .

# 컨테이너가 8000번 포트에서 실행되도록 설정합니다.
EXPOSE 8000

# 컨테이너가 시작되면 실행할 명령을 지정합니다.
CMD [ "npm", "start" ]
