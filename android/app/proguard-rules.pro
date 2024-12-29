# Keep React Native Fabric
-keep class com.facebook.react.fabric.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.fabric.FabricUIManager { *; }
-keep class com.facebook.react.fabric.Binding { *; }
-keep class com.facebook.react.fabric.ComponentFactory { *; }

# Keep NativeStackView components
-keep class com.swmansion.** { *; }
-keep class com.th3rdwave.** { *; }
-keep public class * implements com.facebook.react.ReactPackage

# General React Native rules
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.jni.annotations.*

-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepattributes RuntimeVisible*Annotations
-keepattributes *Annotation*
-dontwarn com.facebook.react.**
-keep class com.facebook.react.** { *; }