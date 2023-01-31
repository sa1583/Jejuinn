package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.GuestHouse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class GuestHouseRepositoryTest {

    @Autowired GuestHouseRepository guestHouseRepository;

    @Test
    public void test(){
        GuestHouse gh1 = GuestHouse.builder()
                        .guestHouseName("gh1")
                                .address("gh1 address")
                                        .addressDetail("gh1 address detail")
                                                .representativeUid(1L)
                                                        .build();
        GuestHouse gh2 = GuestHouse.builder()
                .guestHouseName("gh2")
                .address("gh2 address")
                .representativeUid(2L)
                .build();

        guestHouseRepository.save(gh1);
        guestHouseRepository.save(gh2);

        gh1.setGuestHouseName("gh1 new name");

        GuestHouse gh1s = guestHouseRepository.findById(gh1.getUid()).get();
        System.out.println(gh1s.getGuestHouseName());
        assertThat(gh1s.getGuestHouseName()).isEqualTo(gh1.getGuestHouseName());

        gh2.setAddressDetail("???");

        assertThat(guestHouseRepository.findById(gh2.getUid()).get().getAddressDetail()).isEqualTo(gh2.getAddressDetail());
    }
}