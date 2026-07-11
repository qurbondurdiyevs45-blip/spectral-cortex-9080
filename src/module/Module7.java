// Spectral Cortex — module 7
package com.pushforge.spectral_cortex_;

import java.util.*;
import java.util.stream.*;

public class Module7 {
    public static Map<String, Long> wordCount(String text){
        return Arrays.stream(text.toLowerCase().split("\\W+"))
            .filter(s -> !s.isEmpty())
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
    }
    public static void main(String[] args){
        System.out.println(wordCount("An autonomous event sourcing store scaffolded by PushForge Engine."));
    }
}