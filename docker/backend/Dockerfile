## Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

## Runtime stage

FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.4

WORKDIR /app
COPY --from=build /build/target/book-sweeper-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bs:5432/book_sweeper
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

ENV EMAIL_HOSTNAME=missing_host_name
ENV EMAIL_USERNAME=missing_username
ENV EMAIL_PASSWORD=missing_password

ENV JWT_SECRET_KEY=missing_jwt_secret

ENV AWS_ACCESS_KEY_ID=missing_access_key_id
ENV AWS_SECRET_ACCESS_KEY=missing_secret_access_key

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-sweeper-${JAR_VERSION}.jar
