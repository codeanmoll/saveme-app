import React, { useState, useEffect, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  NativeEventEmitter,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
// 1. IMPORT MARKDOWN
import Markdown from 'react-native-markdown-display';
import { generate, stopGeneration, llamaModule } from "../src/ai/llama";

export default function AiHelpScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I am your offline AI assistant. How can I help you survive today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(llamaModule);
    const listener = eventEmitter.addListener("onLlamaToken", (token) => {
      setMessages((prevMessages) => {
        const lastMsg = prevMessages[prevMessages.length - 1];
        if (lastMsg && lastMsg.role === "bot") {
          return [...prevMessages.slice(0, -1), { ...lastMsg, text: lastMsg.text + token }];
        } else {
          return [...prevMessages, { role: "bot", text: token }];
        }
      });
    });
    return () => listener.remove();
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: "" }
    ]);

    try {
      await generate(userText);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStop = async () => {
    try {
      await stopGeneration();
    } catch (e) {
      console.error("Stop error:", e);
    }
  };
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
       <Ionicons name="chevron-back-outline" color="#FFF" marginRight={10} onPress={() => navigation.navigate("Main")} size={24} />
        <Text style={styles.headerTitle}>Survival AI</Text>
        </View>
        <View style={styles.onlineBadge}>
          <View style={styles.dot} />
          <Text style={styles.onlineText}>Offline Ready</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* CHAT AREA */}
        <ScrollView
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((m, i) => (
            <View key={i} style={[
              styles.messageRow,
              m.role === "user" ? styles.userRow : styles.botRow
            ]}>
              
              <View style={[
                styles.bubble,
                m.role === "user" ? styles.userBubble : styles.botBubble
              ]}>
                {/* 2. CONDITIONAL RENDERING */}
                {m.role === "user" ? (
                    // User messages stay simple Text
                    <Text style={styles.userText}>{m.text}</Text>
                ) : (
                    // Bot messages use Markdown for formatting
                    <Markdown style={markdownStyles}>
                        {m.text}
                    </Markdown>
                )}
              </View>
            </View>
          ))}

          {isTyping && messages[messages.length - 1].text === "" && (
            <Text style={styles.typingText}>Thinking...</Text>
          )} 
        </ScrollView>

        {/* INPUT AREA */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask for help..."
              placeholderTextColor="#A9A9A9"
              multiline
              editable={!isTyping}
            />

            {isTyping ? (
              <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                <View style={styles.stopIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.sendButton} onPress={send}>
              <Ionicons name="send" color="#FFF" size={28} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- 3. MARKDOWN STYLES (Specific for Dark Mode) ---
const markdownStyles = StyleSheet.create({
    body: {
        color: '#E2E8F0',
        fontSize: 16,
        lineHeight: 24,
    },
    // Headings (Big Bold)
    heading1: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    heading2: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    // Bold text (**text**)
    strong: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    // List items
    list_item: {
        color: '#E2E8F0',
        fontSize: 16,
        marginVertical: 2,
    },
    bullet_list: {
        marginBottom: 10,
    }
});

// --- MAIN STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B090A"
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingLeft:12,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1C',
     backgroundColor: "#0B090A"
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#132e26',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#059669'
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  onlineText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '600',
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bubble: {
    maxWidth: '90%',
    padding: 14,
    borderRadius: 18,
    paddingLeft:0 // Reset padding for Markdown to handle margins
  },
  userBubble: {
    backgroundColor: '#660708',
    paddingLeft: 14 // Keep padding for user text
  },
  botBubble: {
    // Transparent/Dark background for bot so markdown looks seamless
    paddingLeft: 5 
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#E2E8F0', 
    fontSize: 16,
    lineHeight: 24,
  },
  typingText: {
    color: '#B1A7A6',
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#121212',
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 30, 
    paddingHorizontal: 5,
    paddingVertical: 0,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    maxHeight: 100,
    paddingRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    color: '#FFF',
  },
  sendArrow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  stopIcon: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: 'white',
  },
});