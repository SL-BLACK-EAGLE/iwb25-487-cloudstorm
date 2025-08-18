# Aid Request Service Dockerfile
FROM ballerina/ballerina:2201.10.0
WORKDIR /app
COPY Ballerina.toml .
COPY main.bal .
RUN bal build
EXPOSE 8082
CMD ["java", "-jar", "target/bin/aid_request_service.jar"]
