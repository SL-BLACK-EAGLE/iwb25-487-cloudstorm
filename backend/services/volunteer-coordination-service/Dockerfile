FROM ballerina/ballerina:2201.10.0
WORKDIR /app
COPY Ballerina.toml .
COPY main.bal .
RUN bal build
EXPOSE 8084
CMD ["java", "-jar", "target/bin/volunteer_coordination_service.jar"]
