FROM ballerina/ballerina:2201.10.0
WORKDIR /app
COPY Ballerina.toml .
COPY main.bal .
RUN bal build
EXPOSE 8083
CMD ["java", "-jar", "target/bin/donor_management_service.jar"]
