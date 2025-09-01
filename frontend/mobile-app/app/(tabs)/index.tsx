import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import React, {useState} from "react";
import {Image, ImageBackground, Pressable, ScrollView, Text, View} from "react-native";
import {router} from "expo-router";

const weatherBg = require("../../assets/images/weather_bg.png");

const A = {
    header: require("../../assets/images/home_top_bg.png"),
    weatherBg: require("../../assets/images/weather_bg.png"),
    predictor: {
        flood: require("../../assets/images/flood_bg.png"),
        quake: require("../../assets/images/earthquakes_bg.png"),
        drought: require("../../assets/images/drought_bg.png"),
        floodIcon: require("../../assets/icons/flood_icon.png"),
        quakeIcon: require("../../assets/icons/earthquakes_icon.png"),
        droughtIcon: require("../../assets/icons/drought_icon.png"),
    },
    services: {
        govBg: require("../../assets/images/government_service_bg.png"),
        govIcon: require("../../assets/icons/government_service_icon.png"),
        hotlineBg: require("../../assets/images/emergency_hotline_bg.png"),
        hotlineIcon: require("../../assets/icons/emergency_hotline_icon.png"),
        reportBg: require("../../assets/images/report_incident_bg.png"),
        reportIcon: require("../../assets/icons/report_incident_icon.png"),
        safeBg: require("../../assets/images/safe_locations_bg.png"),
        safeIcon: require("../../assets/icons/safe_locations_icon.png"),
    },
    socials: {
        donate: require("../../assets/icons/donation_icon.png"),
        volunteer: require("../../assets/icons/volunteer_icon.png"),
        victims: require("../../assets/icons/victims_icon.png"),
        donateBg: require("../../assets/images/donation_bg.png"),
        volunteerBg: require("../../assets/images/volunteer_bg.png"),
        victimsBg: require("../../assets/images/victims_bg.png"),
    },
};

const HomeScreen = () => {
    // Mock news data - replace with API call in the future
    const [newsData, setNewsData] = useState([{
        id: 1, title: "Flooding in Kalutarapura watapotha", timeAgo: "2 hours ago", location: "Kalutarapura"
    }, {
        id: 2, title: "Landslide warning issued for hill country", timeAgo: "4 hours ago", location: "Nuwara Eliya"
    }]);

    // Future: Replace with actual API call
    // useEffect(() => {
    //     fetchNewsData().then(setNewsData);
    // }, []);

    return (<View className="flex-1 bg-[#E8F5FB]">
        <ScrollView contentContainerStyle={{paddingBottom: 50}} showsVerticalScrollIndicator={false}>
            {/* Header with background image */}
            {/* Header gradient */}
            <LinearGradient
                colors={["#2783ff", "#00d1f3"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                className="px-6 pt-10 pb-8 rounded-b-[28px]"
            >
                <Text className="text-white pt-10 text-2xl font-semibold text-center">Smart Relief</Text>

                {/* Weather card with background image */}
                <ImageBackground
                    source={weatherBg}
                    resizeMode="cover"
                    className="mt-6 rounded px-5 py-4 h-[117px] w-[353px] overflow-hidden"
                >
                    <View className="flex-row items-center ">
                        <Ionicons name="partly-sunny" size={53} color="white"/>
                        <View className={'flex-1 pl-4 '}>
                            <Text className="text-white text-4xl font-semibold ml-3">27°</Text>
                            <Text className="text-white mt-2 ml-3">Colombo</Text>
                            <Text className="text-white text-xs ml-3">Sri Lanka</Text>
                        </View>
                    </View>
                </ImageBackground>
            </LinearGradient>


            {/* Predictor disasters */}
            <Section title="Predictor disasters">
                <View className="flex-row mt-2 gap-4 justify-center">
                    <Chip
                        label="Floods"
                        icon={A.predictor.floodIcon}
                        source={A.predictor.flood}
                    />
                    <Chip
                        label="Earthquakes"
                        icon={A.predictor.quakeIcon}
                        source={A.predictor.quake}
                    />
                    <Chip
                        label="Drought"
                        icon={A.predictor.droughtIcon}
                        source={A.predictor.drought}
                    />
                </View>
            </Section>

            {/* News */}
            <Section title="News of disasters">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                    {newsData.map((news, index) => (<React.Fragment key={news.id}>
                        <NewsCard
                            title={news.title}
                            timeAgo={news.timeAgo}
                            location={news.location}
                        />
                        {index < newsData.length - 1 && <View style={{width: 16}}/>}
                    </React.Fragment>))}
                </ScrollView>
            </Section>

            {/* Social works */}
            <Section title="Social works">
                <View className="space-y-3 mt-4">
                    <SocialCard
                        source={A.socials.donateBg}
                        icon={A.socials.donate}
                        title="Donations"
                        subtitle="Help victims with monetary support"
                    />
                    <SocialCard
                        source={A.socials.volunteerBg}
                        icon={A.socials.volunteer}
                        title="Volunteer"
                        subtitle="Join relief operations"
                    />
                    <SocialCard
                        source={A.socials.victimsBg}
                        icon={A.socials.victims}
                        title="Victims"
                        subtitle="Request emergency assistance"
                    />
                </View>
            </Section>

            {/* Services */}
            <Section title="Services">
                <View className="flex-row flex-wrap justify-between mt-4">
                    <ServiceTile
                       source={A.services.govBg}
                        icon={A.services.govIcon}
                        title="Government Services"
                        subtitle="Access official emergency services"
                    />
                    <ServiceTile
                        source={A.services.hotlineBg}
                        icon={A.services.hotlineIcon}
                        title="Emergency Hotline"
                        subtitle="24/7 emergency contact"
                    />
                    <ServiceTile
                        source={A.services.reportBg}
                        icon={A.services.reportIcon}
                        title="Report Incident"
                        subtitle="Submit disaster reports"
                    />
                    <ServiceTile
                        source={A.services.safeBg}
                        icon={A.services.safeIcon}
                        title="Safe Locations"
                        subtitle="Find nearby shelters"
                    />
                </View>
            </Section>
        </ScrollView>
    </View>
    );
}

/* ——— helpers/components (inline for convenience) ——— */

function Section({title, children}: { title: string; children: React.ReactNode }) {
    return (<View className="px-6 mt-6">
        <Text className="text-black font-semibold">{title}</Text>
        {children}
    </View>);
}

function Chip({
                  label, icon, source,
              }: {
    label: string; icon: any; source: any; // Image source
}) {
    return (// @ts-ignore
        <Pressable onPress={() => router.push({pathname:'/home/PredictorDisasters',params: { hazard: "floods" } })}>
        <ImageBackground
            source={source}
            resizeMode="cover"
            className="flex items-center justify-center mt-2 h-[85px] w-[89px] overflow-hidden "
        >
            <Image
                source={icon}
                className="w-[27px] h-[25px]"
                resizeMode="contain"
                style={{tintColor: "white"}}
            />
            <Text className="text-white mt-2 text-[12px]">{label}</Text>
        </ImageBackground>
        </Pressable>
            );

}

function NewsCard({title, timeAgo, location}: {
    title: string; timeAgo: string; location: string;
}) {
    return (
        <View
            className="w-[349px] h-[136px] bg-white rounded-2xl px-6 py-6 my-2 mx-2"
            style={{elevation: 4}} // Android shadow
        >
            <View className="flex-row items-start">
                <View className="w-[13px] h-[13px] rounded-full bg-[#ff2c39] mt-1.5 mr-2"/>
                <Text className="text-[#798590] text-xl font-semibold flex-1 font-poppins-bold ml-2">
                    {title}
                </Text>
            </View>
            <View className="flex-row items-center mt-3 space-x-6 ml-7">
                <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#000000"/>
                    <Text className="text-[#8AA0AE] text-xs ml-1 leading-loose">{timeAgo}</Text>
                </View>
                <View className="flex-row items-center ml-4">
                    <Ionicons name="location-outline" size={14} color="#000000"/>
                    <Text className="text-[#8AA0AE] text-xs ml-1 leading-loose">{location}</Text>
                </View>
            </View>
        </View>);
}

function SocialCard({source, icon, title, subtitle,}: {
                        source: any; // Image source
                        icon: any;
                        title: string;
                        subtitle: string
                    }
) {
    return (// @ts-ignore
        <ImageBackground
            source={source}
            resizeMode="contain"
            className="flex pl-16 justify-center mt-2 h-[77px] w-full   overflow-hidden "
        >
            <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
                    <Image
                        source={icon}
                        className="w-[42px] h-[42px]"
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <Text className="text-white font-semibold">{title}</Text>
                    <Text className="text-white/90 text-xs mt-0.5">{subtitle}</Text>
                </View>
            </View>
        </ImageBackground>);
}

function ServiceTile({
                         source, icon, title, subtitle,
                     }: { source: any; icon: any; title: string; subtitle: string }) {
    return (
        // Fills half row, same height, rounded, left-aligned
        // Card container (your ImageBackground)
        <ImageBackground
            source={source}
            resizeMode="cover"
            className="w-[48%] h-[162px] mb-4 rounded-2xl px-4 pt-4 justify-start"  // <- top-aligned
            imageStyle={{ borderRadius: 16 }}
        >
            {/* Badge: horizontally centered, at the top */}
            <View className="self-center w-[42px] h-[42px] rounded-full bg-white/20 items-center justify-center mt-4">
                <Image source={icon} style={{ width: 42, height: 42 }} resizeMode="contain" />
            </View>

            <Text className="text-white font-semibold mt-8 text-center leading-5">{title}</Text>
            <Text className="text-white/90 text-sm mt-1 text-center leading-4">{subtitle}</Text>
        </ImageBackground>

    );
}


export default HomeScreen;
