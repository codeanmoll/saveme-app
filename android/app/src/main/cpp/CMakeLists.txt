cmake_minimum_required(VERSION 3.22)
project(native_llama)

add_library(native_llama SHARED native_llama.cpp)

set(JNI_LIBS_PATH ${CMAKE_SOURCE_DIR}/../jniLibs/arm64-v8a)

add_library(llama SHARED IMPORTED)
set_target_properties(llama PROPERTIES IMPORTED_LOCATION
    ${JNI_LIBS_PATH}/libllama.so)

add_library(ggml SHARED IMPORTED)
set_target_properties(ggml PROPERTIES IMPORTED_LOCATION
    ${JNI_LIBS_PATH}/libggml.so)

add_library(ggml-cpu SHARED IMPORTED)
set_target_properties(ggml-cpu PROPERTIES IMPORTED_LOCATION
    ${JNI_LIBS_PATH}/libggml-cpu.so)

add_library(ggml-base SHARED IMPORTED)
set_target_properties(ggml-base PROPERTIES IMPORTED_LOCATION
    ${JNI_LIBS_PATH}/libggml-base.so)

include_directories(${CMAKE_SOURCE_DIR}/llama)

find_library(log-lib log)

target_link_libraries(native_llama
    ${log-lib}
    llama
    ggml
    ggml-cpu
    ggml-base
)
