var dotGraph = " digraph G {\n" +
    "\n" +
    " scenes[label=\"Auditorium\", shape=\"diamond\"];\n" +
    " scene_1[label=\"scene_1:enter\", shape=\"diamond\"];\n" +
    " scene_2[label=\"scene_2:chatting\", shape=\"diamond\"];\n" +
    " scene_3[label=\"scene_3:exit\", shape=\"diamond\"];\n" +
    "\n" +
    " person11[label=\"person 1\", personid = 1, frameid= 543, shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.6,gamma=0.2,alpha_normalized =  0.33 ,beta_normalized =  0.5 ,gamma_normalized =  0.1]\n" +
    " person12[label=\"person 9\", personid = 9, frameid= 543, shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.35,beta=0.51,gamma=0.15,alpha_normalized =  0.35 ,beta_normalized =  0.5 ,gamma_normalized =  0.15]\n" +
    "\n" +
    " full_body11[label=\"full body\", personid = 1, frameid= 543, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.42,gamma=0.1,alpha_normalized =  0.43 ,beta_normalized =  0.46 ,gamma_normalized =  0.11]\n" +
    " upper_body11[label=\"upper body\", personid = 1, frameid= 543, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.8,beta=0.5,gamma=0.2,alpha_normalized =  0.53 ,beta_normalized =  0.33 ,gamma_normalized =  0.13]\n" +
    " lower_body11[label=\"lower body\", personid = 1, frameid= 543, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.32,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head11[label=\"head\", personid = 1, frameid= 543, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.1,beta=0,gamma=0.54,alpha_normalized =  0.16 ,beta_normalized =  0.0 ,gamma_normalized =  0.84]\n" +
    " left_arm11[label=\"left arm\", personid = 1, frameid= 543, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.62,beta=0,gamma=0.09,alpha_normalized =  0.87 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " right_arm11[label=\"right arm\", personid = 1, frameid= 543, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.54,beta=0,gamma=0.01,alpha_normalized =  0.98 ,beta_normalized =  0.0 ,gamma_normalized =  0.02]\n" +
    " torso11[label=\"torso\", personid = 1, frameid= 543, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"short\", gender=\"male\",age=\"\",alpha=0.68,beta=0,gamma=0.3,alpha_normalized =  0.69 ,beta_normalized =  0.0 ,gamma_normalized =  0.31]\n" +
    " left_leg11[label=\"left leg\", personid = 1, frameid= 543, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.2,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg11[label=\"right leg\", personid = 1, frameid= 543, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.18,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head11[label=\"keypoint\", shape = \"oval\", personid = 1, frameid= 543]\n" +
    " keypoint_left_arm11[label=\"keypoint\", shape = \"oval\", personid = 1, frameid= 543]\n" +
    " keypoint_right_arm11[label=\"keypoint\", shape = \"oval\", personid = 1, frameid= 543]\n" +
    " keypoint_left_leg11[label=\"keypoint\", shape = \"oval\", personid = 1, frameid= 543]\n" +
    " keypoint_right_leg11[label=\"keypoint\", shape = \"oval\", personid = 1, frameid= 543]\n" +
    "\n" +
    " full_body12[label=\"full body\",personid = 9, frameid= 543, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.32,beta=0.38,gamma=0.1,alpha_normalized =  0.4 ,beta_normalized =  0.48 ,gamma_normalized =  0.13]\n" +
    " upper_body12[label=\"upper body\", personid = 9, frameid= 543,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.6,beta=0.29,gamma=0.12,alpha_normalized =  0.59 ,beta_normalized =  0.29 ,gamma_normalized =  0.12]\n" +
    " lower_body12[label=\"lower body\", personid = 9, frameid= 543,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.21,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head12[label=\"head\", personid = 9, frameid= 543,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.2,beta=0,gamma=0.22,alpha_normalized =  0.48 ,beta_normalized =  0.0 ,gamma_normalized =  0.52]\n" +
    " left_arm12[label=\"left arm\", personid = 9, frameid= 543,shape = \"oval\", action=\"\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.8,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_arm12[label=\"right arm\", personid = 9, frameid= 543,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.39,beta=0,gamma=0.18,alpha_normalized =  0.68 ,beta_normalized =  0.0 ,gamma_normalized =  0.32]\n" +
    " torso12[label=\"torso\", personid = 9, frameid= 543,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"female\",age=30,alpha=0.7,beta=0,gamma=0.1,alpha_normalized =  0.88 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " left_leg12[label=\"left leg\", personid = 9, frameid= 543,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg12[label=\"right leg\", personid = 9, frameid= 543,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head12[label=\"keypoint\", shape = \"oval\", personid = 9, frameid= 543]\n" +
    " keypoint_left_arm12[label=\"keypoint\", shape = \"oval\", personid = 9, frameid= 543]\n" +
    " keypoint_right_arm12[label=\"keypoint\", shape = \"oval\", personid = 9, frameid= 543]\n" +
    " keypoint_left_leg12[label=\"keypoint\", shape = \"oval\", personid = 9, frameid= 543]\n" +
    " keypoint_right_leg12[label=\"keypoint\", shape = \"oval\", personid = 9, frameid= 543]\n" +
    "\n" +
    "\n" +
    "\n" +
    " person21[label=\"person 15\",  personid = 15, frameid= 1430,shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"tshirt-jeans\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.6,gamma=0.2,alpha_normalized =  0.33 ,beta_normalized =  0.5 ,gamma_normalized =  0.17]\n" +
    " person22[label=\"person 16\", personid = 16, frameid= 1430,shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.35,beta=0.51,gamma=0.15,alpha_normalized =  0.35 ,beta_normalized =  0.5 ,gamma_normalized =  0.15]\n" +
    "\n" +
    " full_body21[label=\"full body\", personid = 15, frameid= 1430,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.42,gamma=0.1,alpha_normalized =  0.43 ,beta_normalized =  0.46 ,gamma_normalized =  0.11]\n" +
    " upper_body21[label=\"upper body\", personid = 15, frameid= 1430,shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.8,beta=0.5,gamma=0.2,alpha_normalized =  0.53 ,beta_normalized =  0.33 ,gamma_normalized =  0.13]\n" +
    " lower_body21[label=\"lower body\", personid = 15, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.32,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head21[label=\"head\", personid = 15, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.1,beta=0,gamma=0.54,alpha_normalized =  0.16 ,beta_normalized =  0.0 ,gamma_normalized =  0.84]\n" +
    " left_arm21[label=\"left arm\", personid = 15, frameid= 1430,shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.62,beta=0,gamma=0.09,alpha_normalized =  0.87 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " right_arm21[label=\"right arm\", personid = 15, frameid= 1430,shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.54,beta=0,gamma=0.01,alpha_normalized =  0.98 ,beta_normalized =  0.0 ,gamma_normalized =  0.02]\n" +
    " torso21[label=\"torso\", personid = 15, frameid= 1430,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"short\", gender=\"male\",age=\"\",alpha=0.68,beta=0,gamma=0.3,alpha_normalized =  0.69 ,beta_normalized =  0.0 ,gamma_normalized =  0.31]\n" +
    " left_leg21[label=\"left leg\",personid = 15, frameid= 1430, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.2,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg21[label=\"right leg\", personid = 15, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.18,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head21[label=\"keypoint\", shape = \"oval\",personid = 15, frameid= 1430]\n" +
    " keypoint_left_arm21[label=\"keypoint\", shape = \"oval\",personid = 15, frameid= 1430]\n" +
    " keypoint_right_arm21[label=\"keypoint\", shape = \"oval\",personid = 15, frameid= 1430]\n" +
    " keypoint_left_leg21[label=\"keypoint\", shape = \"oval\",personid = 15, frameid= 1430]\n" +
    " keypoint_right_leg21[label=\"keypoint\", shape = \"oval\",personid = 15, frameid= 1430]\n" +
    "\n" +
    " full_body22[label=\"full body\",personid = 16, frameid= 1430, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.32,beta=0.38,gamma=0.1,alpha_normalized =  0.4 ,beta_normalized =  0.48 ,gamma_normalized =  0.13]\n" +
    " upper_body22[label=\"upper body\", personid = 16, frameid= 1430,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.6,beta=0.29,gamma=0.12,alpha_normalized =  0.59 ,beta_normalized =  0.29 ,gamma_normalized =  0.12]\n" +
    " lower_body22[label=\"lower body\", personid = 16, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.21,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head22[label=\"head\",personid = 16, frameid= 1430, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.2,beta=0,gamma=0.22,alpha_normalized =  0.48 ,beta_normalized =  0.0 ,gamma_normalized =  0.52]\n" +
    " left_arm22[label=\"left arm\", personid = 16, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.8,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_arm22[label=\"right arm\", personid = 16, frameid= 1430,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.39,beta=0,gamma=0.18,alpha_normalized =  0.68 ,beta_normalized =  0.0 ,gamma_normalized =  0.32]\n" +
    " torso22[label=\"torso\", personid = 16, frameid= 1430,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"female\",age=30,alpha=0.7,beta=0,gamma=0.1,alpha_normalized =  0.88 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " left_leg22[label=\"left leg\", personid = 16, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg22[label=\"right leg\", personid = 16, frameid= 1430,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head22[label=\"keypoint\", shape = \"oval\",personid = 16, frameid= 1430]\n" +
    " keypoint_left_arm22[label=\"keypoint\", shape = \"oval\",personid = 16, frameid= 1430]\n" +
    " keypoint_right_arm22[label=\"keypoint\", shape = \"oval\",personid = 16, frameid= 1430]\n" +
    " keypoint_left_leg22[label=\"keypoint\", shape = \"oval\",personid = 16, frameid= 1430]\n" +
    "\n" +
    "\n" +
    " person31[label=\"person 12\", personid = 12, frameid= 5020,shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.6,gamma=0.2,alpha_normalized =  0.33 ,beta_normalized =  0.5 ,gamma_normalized =  0.17]\n" +
    " person32[label=\"person 17\", personid = 17, frameid= 5020,shape=\"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.35,beta=0.51,gamma=0.15,alpha_normalized =  0.35 ,beta_normalized =  0.5 ,gamma_normalized =  0.15]\n" +
    "\n" +
    " full_body31[label=\"full body\",personid = 12, frameid= 5020, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.4,beta=0.42,gamma=0.1,alpha_normalized =  0.43 ,beta_normalized =  0.46 ,gamma_normalized =  0.11]\n" +
    " upper_body31[label=\"upper body\",personid = 12, frameid= 5020, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.8,beta=0.5,gamma=0.2,alpha_normalized =  0.53 ,beta_normalized =  0.33 ,gamma_normalized =  0.13]\n" +
    " lower_body31[label=\"lower body\",personid = 12, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.32,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head31[label=\"head\",personid = 12, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"male\",age=30,alpha=0.1,beta=0,gamma=0.54,alpha_normalized =  0.16 ,beta_normalized =  0.0 ,gamma_normalized =  0.84]\n" +
    " left_arm31[label=\"left arm\",personid = 12, frameid= 5020, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.62,beta=0,gamma=0.09,alpha_normalized =  0.87 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " right_arm31[label=\"right arm\",personid = 12, frameid= 5020, shape = \"oval\", action=\"standing/sitting/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.54,beta=0,gamma=0.01,alpha_normalized =  0.98 ,beta_normalized =  0.0 ,gamma_normalized =  0.02]\n" +
    " torso31[label=\"torso\", personid = 12, frameid= 5020,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"short\", gender=\"male\",age=\"\",alpha=0.68,beta=0,gamma=0.3,alpha_normalized =  0.69 ,beta_normalized =  0.0 ,gamma_normalized =  0.31]\n" +
    " left_leg31[label=\"left leg\",personid = 12, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.2,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg31[label=\"right leg\",personid = 12, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.18,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head31[label=\"keypoint\", shape = \"oval\",personid = 12, frameid= 5020]\n" +
    " keypoint_left_arm31[label=\"keypoint\", shape = \"oval\",personid = 12, frameid= 5020]\n" +
    " keypoint_right_arm31[label=\"keypoint\", shape = \"oval\",personid = 12, frameid= 5020 ]\n" +
    " keypoint_left_leg31[label=\"keypoint\", shape = \"oval\", personid = 12, frameid= 5020]\n" +
    " keypoint_right_leg31[label=\"keypoint\", shape = \"oval\", personid = 12, frameid= 5020]\n" +
    "\n" +
    " full_body32[label=\"full body\",personid = 17, frameid= 5020, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.32,beta=0.38,gamma=0.1,alpha_normalized =  0.4 ,beta_normalized =  0.48 ,gamma_normalized =  0.13]\n" +
    " upper_body32[label=\"upper body\",personid = 17, frameid= 5020, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.6,beta=0.29,gamma=0.12,alpha_normalized =  0.59 ,beta_normalized =  0.29 ,gamma_normalized =  0.12]\n" +
    " lower_body32[label=\"lower body\",personid = 17, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.21,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " head32[label=\"head\", personid = 17, frameid= 5020,shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"\", glass=\"no\", hat=\"no\", hair_style=\"short\", gender=\"female\",age=30,alpha=0.2,beta=0,gamma=0.22,alpha_normalized =  0.48 ,beta_normalized =  0.0 ,gamma_normalized =  0.52]\n" +
    " left_arm32[label=\"left arm\",personid = 17, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.8,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_arm32[label=\"right arm\",personid = 17, frameid= 5020, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0.39,beta=0,gamma=0.18,alpha_normalized =  0.68 ,beta_normalized =  0.0 ,gamma_normalized =  0.32]\n" +
    " torso32[label=\"torso\",personid = 17, frameid= 5020, shape = \"oval\", action=\"sitting/standing/walking\", cloth_style=\"half_sleeve\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"female\",age=30,alpha=0.7,beta=0,gamma=0.1,alpha_normalized =  0.88 ,beta_normalized =  0.0 ,gamma_normalized =  0.13]\n" +
    " left_leg32[label=\"left leg\", personid = 17, frameid= 5020,shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    " right_leg32[label=\"right leg\",personid = 17, frameid= 5020, shape = \"oval\", action=\"\", cloth_style=\"\", glass=\"\", hat=\"\", hair_style=\"\", gender=\"\",age=\"\",alpha=0,beta=0,gamma=0.19,alpha_normalized =  0.0 ,beta_normalized =  0.0 ,gamma_normalized =  1.0]\n" +
    "\n" +
    " keypoint_head32[label=\"keypoint\", shape = \"oval\",personid = 17, frameid= 5020]\n" +
    " keypoint_left_arm32[label=\"keypoint\", shape = \"oval\",personid = 17, frameid= 5020]\n" +
    " keypoint_right_arm32[label=\"keypoint\", shape = \"oval\",personid = 17, frameid= 5020]\n" +
    "\n" +
    " scenes -> scene_1;\n" +
    " scenes -> scene_2;\n" +
    " scenes -> scene_3;\n" +
    "\n" +
    // " scene_2 -> scene_1[label=\"summary\"];\n" +
    // " scene_1 -> scene_3[label=\"contrast\"];\n" +
    "\n" +
    " scene_1 -> person11;\n" +
    " scene_1 -> person12;\n" +
    "\n" +
    " person11 -> full_body11;\n" +
    " full_body11 -> upper_body11;\n" +
    " upper_body11 -> left_arm11 -> keypoint_left_arm11;\n" +
    " upper_body11 -> right_arm11 -> keypoint_right_arm11;\n" +
    " upper_body11 -> torso11 -> head11 -> keypoint_head11;\n" +
    " full_body11 -> lower_body11\n" +
    " lower_body11 -> left_leg11 -> keypoint_left_leg11;\n" +
    " lower_body11 -> right_leg11 -> keypoint_right_leg11;\n" +
    "\n" +
    " person12 -> full_body12;\n" +
    " full_body12 -> upper_body12;\n" +
    " upper_body12 -> left_arm12 -> keypoint_left_arm12;\n" +
    " upper_body12 -> right_arm12 -> keypoint_right_arm12;\n" +
    " upper_body12 -> torso12 -> head12 -> keypoint_head12;\n" +
    " full_body12 -> lower_body12\n" +
    " lower_body12 -> left_leg12 -> keypoint_left_leg12;\n" +
    " lower_body12 -> right_leg12 -> keypoint_right_leg12;\n" +
    "\n" +
    "\n" +
    " scene_2 -> person21;\n" +
    " scene_2 -> person22;\n" +
    "\n" +
    " person21 -> full_body21;\n" +
    " full_body21 -> upper_body21;\n" +
    " upper_body21 -> left_arm21 -> keypoint_left_arm21;\n" +
    " upper_body21 -> right_arm21 -> keypoint_right_arm21;\n" +
    " upper_body21 -> torso21 -> head21 -> keypoint_head21;\n" +
    " full_body21 -> lower_body21\n" +
    " lower_body21 -> left_leg21 -> keypoint_left_leg21;\n" +
    " lower_body21 -> right_leg21 -> keypoint_right_leg21;\n" +
    "\n" +
    " person22 -> full_body22;\n" +
    " full_body22 -> upper_body22;\n" +
    " upper_body22 -> left_arm22 -> keypoint_left_arm22;\n" +
    " upper_body22 -> right_arm22 -> keypoint_right_arm22;\n" +
    " upper_body22 -> torso22 -> head22 -> keypoint_head22;\n" +
    " full_body22 -> lower_body22\n" +
    " lower_body22 -> left_leg22 -> keypoint_left_leg22;\n" +
    " lower_body22 -> right_leg22 -> keypoint_right_leg22;\n" +
    "\n" +
    "\n" +
    " scene_3 -> person31;\n" +
    " scene_3 -> person32;\n" +
    "\n" +
    " person31 -> full_body31;\n" +
    " full_body31 -> upper_body31;\n" +
    " upper_body31 -> left_arm31 -> keypoint_left_arm31;\n" +
    " upper_body31 -> right_arm31 -> keypoint_right_arm31;\n" +
    " upper_body31 -> torso31 -> head31 -> keypoint_head31;\n" +
    " full_body31 -> lower_body31\n" +
    " lower_body31 -> left_leg31 -> keypoint_left_leg31;\n" +
    " lower_body31 -> right_leg31 -> keypoint_right_leg31;\n" +
    "\n" +
    " person32 -> full_body32;\n" +
    " full_body32 -> upper_body32;\n" +
    " upper_body32 -> left_arm32 -> keypoint_left_arm32;\n" +
    " upper_body32 -> right_arm32 -> keypoint_right_arm32;\n" +
    " upper_body32 -> torso32 -> head32 -> keypoint_head32;\n" +
    " full_body32 -> lower_body32\n" +
    " lower_body32 -> left_leg32 -> keypoint_left_leg32;\n" +
    " lower_body32 -> right_leg32 -> keypoint_right_leg32;\n" +
    " }\n";

// function renderParseGraph() {
//     var options = {
//         "canvas": "#canvas-aog",
//         "radius": 12,
//         "width":  750,
//         "height": 450,
//         "highlighted": ["person11","full_body11","upper_body11","lower_body11"]
//     };
//
//     var jp = dot2json(dotGraph);
//     // console.log(jp.root);
//     drawGraph(jp.root, options);
// }

var pgGraphGlobal;

var explanation = {
    "parsegraph": "digraph G{ person21 [ gamma_normalized=\"0.17\", personid=\"15\", gender=\"male\", age=\"30\", alpha_normalized=\"0.33\", beta=\"0.6\", frameid=\"1430\", glass=\"no\", shape=\"oval\", hair_style=\"short\", cloth_style=\"tshirt-jeans\", alpha=\"0.4\", action=\"sitting/standing/walking\", beta_normalized=\"0.5\", label=\"person 15\", hat=\"no\", gamma=\"0.2\" ]   scene_2 [ shape=\"diamond\", label=\"scene_2:chatting\" ]   full_body21 [ gamma_normalized=\"0.11\", personid=\"15\", gender=\"male\", age=\"30\", alpha_normalized=\"0.43\", beta=\"0.42\", frameid=\"1430\", glass=\"no\", shape=\"oval\", hair_style=\"short\", cloth_style=\"half_sleeve\", alpha=\"0.4\", action=\"sitting/standing/walking\", beta_normalized=\"0.46\", label=\"full body\", hat=\"no\", gamma=\"0.1\" ]  person21->full_body21;scene_2->person21;}",
    "highlights": ["person21", "scene_2", "full_body21"]
};

function  renderParseGraph() {
    var jp = dot2json(dotGraph);

    pgGraphGlobal = new ParseGraphRender("#canvas-aog", 750, 450, 12);

    pgGraphGlobal.drawGraph(jp.root);



    var pgGraph = new ParseGraphRender("#canvas-pg", 300, 400, 7);

    jp = dot2json(explanation.parsegraph);

    pgGraph.clear();

    pgGraph.drawGraph(jp.root);

    // pgGraphGlobal.highlight(explanation.highlights);
}
