import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
    Path,
    Line,
    Text as SvgText,
    G,
    Polygon,
    Circle,
    Defs,
    LinearGradient,
    Stop,
    Rect
} from "react-native-svg";

// Disaster images - using placeholder URLs for different disasters
const DISASTER_IMAGES = {
    floods: [
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop", // Flood scene
        "https://images.unsplash.com/photo-1562601579-599dec564e06?w=800&h=600&fit=crop", // Earthquake damage
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop", // River overflow
    ],
    earthquakes: [
        "https://images.unsplash.com/photo-1562601579-599dec564e06?w=800&h=600&fit=crop", // Earthquake damage
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop", // Flood scene
        "https://images.unsplash.com/photo-1518709268805-4e9042af2e48?w=800&h=600&fit=crop", // Geological formation
    ],
    drought: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop", // Drought landscape
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop", // Drought landscape
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop", // Desert scene
    ],
};

const A = {
    // header wave
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    paragraphBG: require("../../assets/images/PredictorDisasterCard.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ---------- hazard-specific content ----------
const HAZARD_CONTENT: Record<
    string,
    {
        name: string;
        slides: string[];
        paragraph: string;
        chart: { year: number; value: number }[];
        color: string;
        gradient: string[];
    }
> = {
    floods: {
        name: "Floods",
        slides: DISASTER_IMAGES.floods,
        paragraph:
            "Heavy rainfall and river overflows increase flood likelihood in low-lying areas. Stay informed of alerts and keep evacuation routes ready.",
        chart: [
            { year: 2026, value: 22 },
            { year: 2027, value: 45 },
            { year: 2028, value: 40 },
            { year: 2029, value: 72 },
            { year: 2030, value: 33 },
            { year: 2031, value: 68 },
        ],
        color: "#3B82F6",
        gradient: ["#60A5FA", "#3B82F6"],
    },
    earthquakes: {
        name: "Earthquakes",
        slides: DISASTER_IMAGES.earthquakes,
        paragraph:
            "Seismic activity indicates moderate risk around local fault lines. Secure heavy items and prepare drop–cover–hold procedures.",
        chart: [
            { year: 2026, value: 15 },
            { year: 2027, value: 28 },
            { year: 2028, value: 55 },
            { year: 2029, value: 38 },
            { year: 2030, value: 61 },
            { year: 2031, value: 70 },
        ],
        color: "#EF4444",
        gradient: ["#F87171", "#EF4444"],
    },
    drought: {
        name: "Drought",
        slides: DISASTER_IMAGES.drought,
        paragraph:
            "Longer dry spells and heat anomalies suggest rising drought pressure. Conserve water and monitor irrigation and reservoir levels.",
        chart: [
            { year: 2026, value: 30 },
            { year: 2027, value: 34 },
            { year: 2028, value: 46 },
            { year: 2029, value: 65 },
            { year: 2030, value: 59 },
            { year: 2031, value: 73 },
        ],
        color: "#F59E0B",
        gradient: ["#FDE047", "#F59E0B"],
    },
};

export default function PredictorDisasters() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { hazard } = useLocalSearchParams<{ hazard?: string }>();

    const key = String(hazard || "").toLowerCase();
    const content = HAZARD_CONTENT[key] ?? HAZARD_CONTENT["floods"];

    // keep header wave exact
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    // carousel
    const [page, setPage] = useState(0);
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        const w = e.nativeEvent.layoutMeasurement.width;
        setPage(Math.round(x / w));
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header ===== */}
            <ImageBackground
                source={A.header}
                resizeMode="cover"
                className={'mt-[45px]'}
                style={{
                    width: SCREEN_WIDTH,
                    aspectRatio: headerAR,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                }}
            >
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute left-4 top-4 h-10 w-10 items-center justify-center"
                        hitSlop={10}
                    >
                        <Image
                            source={A.back}
                            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Predictor disasters
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{ flex: 1 }}
            >
                {/* Carousel with proper spacing */}
                <View style={{ marginTop: 24 }}>
                    <Carousel slides={content.slides} page={page} onScroll={onScroll} />
                </View>

                {/* Section title – make it dynamic */}
                <Text className="px-6 mt-6 text-[15px] font-semibold text-black">
                    Prediction of {content.name}
                </Text>

                {/* Chart Card with improved spacing */}
                <View className="px-6 mt-4">
                    <ChartCard title="Risk Level Forecast">
                        <BeautifulLineChart
                            data={content.chart}
                            color={content.color}
                            gradient={content.gradient}
                        />
                    </ChartCard>
                </View>

                {/* Paragraph Card with proper spacing */}
                <View className="px-6 mt-6 mb-4">
                    <ParagraphCard bg={A.paragraphBG}>{content.paragraph}</ParagraphCard>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function Carousel({
                      slides,
                      page,
                      onScroll,
                  }: {
    slides: string[];
    page: number;
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}) {
    const W = SCREEN_WIDTH - 48; // 24px side padding
    const H = 220; // Fixed height for better consistency

    return (
        <View className="px-6">
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToAlignment="center"
                style={{ width: "100%" }}
            >
                {slides.map((imageUri, i) => (
                    <View key={i} style={{ width: SCREEN_WIDTH - 48 }} className="items-center">
                        <View
                            style={{
                                width: W,
                                height: H,
                                borderRadius: 16,
                                backgroundColor: '#E5E7EB',
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.2,
                                shadowRadius: 16,
                                elevation: 10,
                            }}
                        >
                            <Image
                                source={{ uri: imageUri }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 16,
                                }}
                                resizeMode="cover"
                            />
                            {/* Overlay gradient for better text readability if needed */}
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 60,
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16,
                                    //@ts-ignore
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                                }}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Improved dots with better spacing */}
            <View className="flex-row justify-center items-center mt-4">
                {slides.map((_, i) => (
                    <View
                        key={i}
                        className={`mx-[4px] rounded-full transition-all duration-200 ${
                            i === page ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        style={{
                            width: i === page ? 12 : 8,
                            height: i === page ? 12 : 8,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View
            className="bg-white rounded-2xl"
            style={{
                padding: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 12,
            }}
        >
            <Text className="text-[16px] mb-4 font-bold text-gray-800">{title}</Text>
            <View className="rounded-xl overflow-hidden bg-white">{children}</View>
        </View>
    );
}

function BeautifulLineChart({
                                data,
                                color = "#3B82F6",
                                gradient = ["#60A5FA", "#3B82F6"]
                            }: {
    data: { year: number; value: number }[];
    color?: string;
    gradient?: string[];
}) {
    const W = SCREEN_WIDTH - 48 - 40; // chart card inner width
    const H = 260;
    const pad = {l: 50, r: 20, t: 20, b: 40};
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;

    const years = data.map((d) => d.year);
    const minX = Math.min(...years);
    const maxX = Math.max(...years);

    // Fixed Y axis range from 0 to 100
    const maxY = 100;
    const minY = 0;

    const x = (year: number) => pad.l + ((year - minX) / (maxX - minX)) * innerW;
    const y = (value: number) => pad.t + innerH - ((value - minY) / (maxY - minY)) * innerH;

    // Create smooth curve path
    const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.year)} ${y(d.value)}`).join(" ");

    // Create area path for gradient fill
    const areaPath = `${pathD} L ${x(data[data.length - 1].year)} ${pad.t + innerH} L ${x(data[0].year)} ${pad.t + innerH} Z`;

    const yTicks = [0, 20, 40, 60, 80, 100];
    const xTicks = data.map((d) => d.year);

    return (
        <Svg width={W} height={H}>
            <Defs>
                <LinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor={gradient[0]} stopOpacity="0.8"/>
                    <Stop offset="100%" stopColor={gradient[1]} stopOpacity="0.1"/>
                </LinearGradient>
                <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor={gradient[0]}/>
                    <Stop offset="100%" stopColor={gradient[1]}/>
                </LinearGradient>
            </Defs>

            {/* Background grid */}
            {yTicks.map((tick) => (
                <Line
                    key={`grid-${tick}`}
                    x1={pad.l}
                    y1={y(tick)}
                    x2={pad.l + innerW}
                    y2={y(tick)}
                    stroke="#F3F4F6"
                    strokeWidth={1}
                />
            ))}

            {/* Area fill */}
            <Path d={areaPath} fill="url(#chartGradient)"/>

            {/* Main line */}
            <Path d={pathD} stroke="url(#lineGradient)" strokeWidth={3} fill="none"/>

            {/* Data points */}
            {data.map((d, i) => (
                <Circle
                    key={i}
                    cx={x(d.year)}
                    cy={y(d.value)}
                    r={5}
                    fill="white"
                    stroke={color}
                    strokeWidth={3}
                />
            ))}

            {/* Y axis labels */}
            {yTicks.map((tick) => (
                <SvgText
                    key={`yt-${tick}`}
                    x={pad.l - 15}
                    y={y(tick)}
                    fill="#6B7280"
                    fontSize="12"
                    textAnchor="end"
                    alignmentBaseline="middle"
                    fontWeight="600"
                >
                    {tick}%
                </SvgText>
            ))}

            {/* X axis labels */}
            {xTicks.map((tick) => (
                <SvgText
                    key={`xt-${tick}`}
                    x={x(tick)}
                    y={pad.t + innerH + 20}
                    fill="#6B7280"
                    fontSize="12"
                    textAnchor="middle"
                    fontWeight="600"
                >
                    {tick}
                </SvgText>
            ))}

            {/* Value labels on points */}
            {data.map((d, i) => (
                <SvgText
                    key={`val-${i}`}
                    x={x(d.year)}
                    y={y(d.value) - 15}
                    fill={color}
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight="bold"
                >
                    {d.value}%
                </SvgText>
            ))}
        </Svg>
    );
}
function ParagraphCard({ bg, children }: { bg: any; children: React.ReactNode }) {
    const src = Image.resolveAssetSource(bg);
    const W = SCREEN_WIDTH - 48;
    const H = Math.round(W * (src.height / src.width));

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={{
                width: W,
                height: H,
                borderRadius: 16,
                overflow: "hidden",
                justifyContent: "center",
            }}
            imageStyle={{ borderRadius: 16 }}
        >

            <View className="px-6 py-4">
                <Text className="text-white text-[14px] leading-6 text-center font-medium">
                    {children}
                </Text>
            </View>
        </ImageBackground>
    );
}
