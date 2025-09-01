# Minimal Dockerfile for notification-ws-service
FROM ballerina/ballerina:2201.12.7 AS build
WORKDIR /app
COPY Ballerina.toml Dependencies.toml ./
COPY main.bal ./
USER root
RUN bal build --offline || bal build

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/bin/notification_ws_service.jar /app/
EXPOSE 8090
ENTRYPOINT ["java","-jar","notification_ws_service.jar"]
