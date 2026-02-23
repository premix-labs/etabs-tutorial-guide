---
title: แก้ปัญหาที่พบบ่อย (Troubleshooting)
description: รวมปัญหาที่วิศวกรเจอบ่อยที่สุดใน ETABS พร้อมวิธีแก้
sidebar:
  order: 13
---

## ปัญหาตอน Modeling

### ❌ "Section not defined" ตอนวาดเสา/คาน

**สาเหตุ:** ยังไม่ได้สร้าง Section ก่อนวาด

**วิธีแก้:**

1.  ไปที่ **Define > Section Properties > Frame Sections...**
2.  กด **Add New Property** -> เลือก Concrete Rectangular
3.  ตั้งค่าขนาด (เช่น 0.80 × 0.80 สำหรับเสา)
4.  กด OK -> กลับไปวาดใหม่

### ❌ เสา/คานไม่เชื่อมกัน (ลอยอยู่)

**สาเหตุ:** จุดปลายไม่ตรงกับ Joint ที่มีอยู่

**วิธีแก้:**

1.  เปิดมุมมอง 3D -> Zoom เข้าไปดูจุดเชื่อมต่อ
2.  ถ้าไม่ตรง ให้ลบแล้ววาดใหม่ โดย **Snap to Joint/Grid**
3.  หรือใช้ **Edit > Merge Joints** (ระยะ tolerance 0.01 m)

---

## ปัญหาตอน Run Analysis

### ❌ "Structure is unstable" / "Instability detected"

**สาเหตุ (บ่อยที่สุด):**
| สาเหตุ | วิธีตรวจ | วิธีแก้ |
|---|---|---|
| ลืม Assign Support | ดูที่ Base ว่ามีสัญลักษณ์ Support | **Assign > Joint > Restraints** -> เลือก Fixed |
| เสาลอยไม่ต่อกับคาน | Zoom 3D เช็คจุดต่อ | ลบวาดใหม่ หรือ Merge Joints |
| ตั้ง Release ผิด | เช็ค Frame Releases | ลบ Release ที่ทำให้เป็น Mechanism |
| Diaphragm ไม่ครบ | ดูว่าทุกชั้นมี Diaphragm | **Assign > Shell > Diaphragm** |

**วิธีหาจุดที่มีปัญหา:**

1.  ไปที่ **Analyze > Check Model...**
2.  ติ๊กทุกช่อง -> กด OK
3.  ดูรายงาน -> ETABS จะบอกว่า Joint ไหน/ชั้นไหนมีปัญหา

### ❌ Analysis ค้างนานมาก (> 30 นาที)

**วิธีแก้:**

1.  ลด **Number of Modes** ลง (เช่น จาก 90 เป็น 30)
2.  ลบ Load Case ที่ไม่จำเป็นออก
3.  เช็คว่าปิด **Non-linear Analysis** (ถ้าไม่จำเป็น)
4.  ลอง **32-bit Solver** ถ้าเครื่อง RAM น้อย

---

## ปัญหาตอนดูผลลัพธ์

### ❌ Drift เกินเกณฑ์ (Drift > H/200)

**วิธีแก้ (เรียงตามประสิทธิภาพ):**
| ลำดับ | วิธีแก้ | ผลต่อ Drift |
|---|---|---|
| 1 | **เพิ่มผนังรับแรง** | ลดได้มากสุด ⭐⭐⭐⭐⭐ |
| 2 | **เพิ่มความหนาผนัง** (เช่น 20→30 ซม.) | ⭐⭐⭐⭐ |
| 3 | **เพิ่มขนาดเสา** | ⭐⭐⭐ |
| 4 | **เพิ่ม Concrete Grade** (เช่น C35→C45) | ⭐⭐ |
| 5 | **เพิ่มขนาดคาน** | ⭐ (ช่วยน้อย) |

### ❌ Modal Mass Participation ไม่ถึง 90%

**วิธีแก้:**

1.  ไปที่ **Define > Load Cases...**
2.  เลือก **Modal** -> กด Modify
3.  เพิ่ม **Number of Modes** (เช่น 30 → 60 → 90)
4.  Run Analysis ใหม่
5.  เช็ค: **Display > Show Tables > Modal Participating Mass Ratios**

---

## ปัญหาตอน Design

### ❌ O/S Ratio > 1.0 (เสา/คาน ไม่ผ่าน)

**O/S = Overstress Ratio** ถ้า > 1.0 แปลว่าหน้าตัดไม่พอ

**วิธีแก้:**
| O/S Ratio | แนวทาง |
|---|---|
| 1.0 - 1.2 | เพิ่มเหล็กเสริม (ถ้ายังเพิ่มได้) |
| 1.2 - 1.5 | เพิ่มขนาดหน้าตัด |
| > 1.5 | เพิ่มขนาด + ปรับ Concrete Grade (เช่น C35→C50) |

**วิธีดู:**

1.  **Design > Concrete Frame Design > Display Design Info**
2.  ดับเบิลคลิกที่เสา/คานที่เป็นสีแดง
3.  อ่าน **Controlling Combo** (Load Case ไหนที่ทำให้ไม่ผ่าน)
4.  แก้ไขตามข้อ 3 นั้น แล้ว Re-run Design

### ❌ Rebar Area สูงผิดปกติ

**เช็ค:**

1.  ค่า Rebar Ratio ควรอยู่ **1-4%** สำหรับเสา
2.  ถ้า > 4% แปลว่าหน้าตัดเล็กเกินไป → เพิ่มขนาด
3.  ถ้า < 1% ใช้ค่า minimum = 1%

---

## ปัญหาอื่นๆ

### ❌ ไฟล์เปิดไม่ได้ / Corrupt

**วิธีแก้:**

1.  ลองเปิดไฟล์ Backup (`.e2k` หรือ `.$et`)
2.  ไฟล์ Backup อยู่ในโฟลเดอร์เดียวกับไฟล์หลัก
3.  เปลี่ยนนามสกุลจาก `.$et` เป็น `.edb`

### ❌ License หมดอายุ

1.  เปิด **CSI License Manager** (Start Menu)
2.  กด **Renew License** หรือ ติดต่อ CSI/ตัวแทนจำหน่ายในไทย
